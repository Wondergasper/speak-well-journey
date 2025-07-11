
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import User, Progress, AnalysisResult, Exercise
from sqlalchemy import func, desc
from datetime import datetime, timedelta
import numpy as np

analytics_bp = Blueprint('analytics', __name__)

@analytics_bp.route('/dashboard', methods=['GET'])
@jwt_required()
def get_analytics_dashboard():
    user_id = get_jwt_identity()
    
    # Time range filter
    days = request.args.get('days', 30, type=int)
    start_date = datetime.now() - timedelta(days=days)
    
    # Get progress data
    progress_data = Progress.query.filter_by(user_id=user_id)\
        .filter(Progress.created_at >= start_date)\
        .order_by(Progress.created_at).all()
    
    # Get analysis results
    analysis_data = AnalysisResult.query.filter_by(user_id=user_id)\
        .filter(AnalysisResult.created_at >= start_date)\
        .order_by(AnalysisResult.created_at).all()
    
    # Calculate advanced metrics
    analytics = {
        'overview': calculate_overview_metrics(progress_data, analysis_data),
        'trends': calculate_trends(progress_data, analysis_data),
        'performance': calculate_performance_metrics(progress_data, analysis_data),
        'recommendations': generate_recommendations(progress_data, analysis_data),
        'goals': calculate_goal_progress(user_id, progress_data)
    }
    
    return jsonify(analytics)

@analytics_bp.route('/detailed-report', methods=['GET'])
@jwt_required()
def get_detailed_report():
    user_id = get_jwt_identity()
    
    # Get comprehensive data for detailed analysis
    all_progress = Progress.query.filter_by(user_id=user_id)\
        .order_by(Progress.created_at).all()
    
    all_analyses = AnalysisResult.query.filter_by(user_id=user_id)\
        .order_by(AnalysisResult.created_at).all()
    
    report = {
        'summary': generate_comprehensive_summary(all_progress, all_analyses),
        'detailed_trends': calculate_detailed_trends(all_progress, all_analyses),
        'exercise_effectiveness': analyze_exercise_effectiveness(user_id),
        'improvement_patterns': identify_improvement_patterns(all_progress),
        'comparative_analysis': generate_comparative_analysis(all_progress, all_analyses)
    }
    
    return jsonify(report)

@analytics_bp.route('/real-time-metrics', methods=['GET'])
@jwt_required()
def get_real_time_metrics():
    user_id = get_jwt_identity()
    
    # Get very recent data for real-time display
    recent_progress = Progress.query.filter_by(user_id=user_id)\
        .filter(Progress.created_at >= datetime.now() - timedelta(hours=24))\
        .order_by(Progress.created_at.desc()).all()
    
    recent_analyses = AnalysisResult.query.filter_by(user_id=user_id)\
        .filter(AnalysisResult.created_at >= datetime.now() - timedelta(hours=24))\
        .order_by(AnalysisResult.created_at.desc()).all()
    
    metrics = {
        'current_streak': calculate_current_streak(user_id),
        'today_sessions': len(recent_progress),
        'recent_scores': [p.score for p in recent_progress[:5]],
        'current_trend': calculate_current_trend(recent_progress),
        'next_milestone': calculate_next_milestone(user_id)
    }
    
    return jsonify(metrics)

def calculate_overview_metrics(progress_data, analysis_data):
    """Calculate high-level overview metrics"""
    if not progress_data:
        return {'total_sessions': 0, 'average_score': 0, 'improvement_rate': 0}
    
    scores = [p.score for p in progress_data]
    
    return {
        'total_sessions': len(progress_data),
        'average_score': sum(scores) / len(scores),
        'best_score': max(scores),
        'improvement_rate': calculate_improvement_rate(scores),
        'consistency_score': calculate_consistency_score(progress_data)
    }

def calculate_trends(progress_data, analysis_data):
    """Calculate trend analysis"""
    if len(progress_data) < 2:
        return {'score_trend': [], 'severity_trend': []}
    
    # Group by week for trend analysis
    weekly_scores = {}
    weekly_severity = {}
    
    for progress in progress_data:
        week_key = progress.created_at.strftime('%Y-W%U')
        if week_key not in weekly_scores:
            weekly_scores[week_key] = []
            weekly_severity[week_key] = []
        weekly_scores[week_key].append(progress.score)
        if progress.severity_level:
            weekly_severity[week_key].append(progress.severity_level)
    
    score_trend = [
        {
            'week': week,
            'average_score': sum(scores) / len(scores),
            'session_count': len(scores)
        }
        for week, scores in weekly_scores.items()
    ]
    
    return {
        'score_trend': sorted(score_trend, key=lambda x: x['week']),
        'severity_distribution': calculate_severity_distribution(analysis_data)
    }

def calculate_performance_metrics(progress_data, analysis_data):
    """Calculate detailed performance metrics"""
    if not progress_data:
        return {}
    
    scores = [p.score for p in progress_data]
    
    # Performance quartiles
    sorted_scores = sorted(scores)
    n = len(sorted_scores)
    
    return {
        'quartiles': {
            'q1': sorted_scores[n//4] if n >= 4 else min(scores),
            'q2': sorted_scores[n//2] if n >= 2 else sum(scores)/len(scores),
            'q3': sorted_scores[3*n//4] if n >= 4 else max(scores)
        },
        'volatility': np.std(scores) if len(scores) > 1 else 0,
        'peak_performance': max(scores),
        'performance_stability': calculate_stability_index(scores)
    }

def generate_recommendations(progress_data, analysis_data):
    """Generate personalized recommendations"""
    recommendations = []
    
    if not progress_data:
        return ['Start with regular practice sessions to establish a baseline']
    
    recent_scores = [p.score for p in progress_data[-5:]]
    avg_recent = sum(recent_scores) / len(recent_scores)
    
    if avg_recent < 60:
        recommendations.append("Focus on basic breathing exercises to improve foundation")
    elif avg_recent < 80:
        recommendations.append("Try intermediate exercises to continue improvement")
    else:
        recommendations.append("Challenge yourself with advanced techniques")
    
    # Consistency recommendations
    session_gaps = calculate_session_gaps(progress_data)
    if session_gaps > 2:
        recommendations.append("Try to maintain more consistent practice schedule")
    
    return recommendations

def calculate_improvement_rate(scores):
    """Calculate improvement rate over time"""
    if len(scores) < 2:
        return 0
    
    first_half = scores[:len(scores)//2]
    second_half = scores[len(scores)//2:]
    
    avg_first = sum(first_half) / len(first_half)
    avg_second = sum(second_half) / len(second_half)
    
    return ((avg_second - avg_first) / avg_first * 100) if avg_first > 0 else 0

def calculate_consistency_score(progress_data):
    """Calculate how consistent the user's practice is"""
    if len(progress_data) < 3:
        return 0
    
    # Calculate gaps between sessions
    dates = [p.created_at.date() for p in progress_data]
    gaps = [(dates[i] - dates[i-1]).days for i in range(1, len(dates))]
    
    # Lower variance in gaps = higher consistency
    avg_gap = sum(gaps) / len(gaps)
    gap_variance = sum((gap - avg_gap) ** 2 for gap in gaps) / len(gaps)
    
    # Convert to 0-100 scale (lower variance = higher score)
    consistency = max(0, 100 - gap_variance * 10)
    return min(100, consistency)

def calculate_current_streak(user_id):
    """Calculate current consecutive days of practice"""
    progress = Progress.query.filter_by(user_id=user_id)\
        .order_by(Progress.created_at.desc()).all()
    
    if not progress:
        return 0
    
    streak = 0
    current_date = datetime.now().date()
    
    for p in progress:
        session_date = p.created_at.date()
        if (current_date - session_date).days <= streak + 1:
            if (current_date - session_date).days == streak:
                current_date = session_date
                streak += 1
            elif (current_date - session_date).days == streak + 1:
                current_date = session_date
                streak += 1
        else:
            break
    
    return streak

def calculate_goal_progress(user_id, progress_data):
    """Calculate progress towards user goals"""
    user = User.query.get(user_id)
    
    # Default goals if not set
    goals = {
        'weekly_sessions': 5,
        'target_score': 85,
        'consistency_target': 80
    }
    
    if not progress_data:
        return {goal: {'current': 0, 'target': target, 'progress': 0} 
                for goal, target in goals.items()}
    
    # Calculate current week progress
    week_start = datetime.now() - timedelta(days=7)
    week_sessions = [p for p in progress_data if p.created_at >= week_start]
    
    recent_scores = [p.score for p in progress_data[-10:]]
    avg_score = sum(recent_scores) / len(recent_scores) if recent_scores else 0
    
    consistency = calculate_consistency_score(progress_data[-20:])
    
    return {
        'weekly_sessions': {
            'current': len(week_sessions),
            'target': goals['weekly_sessions'],
            'progress': min(100, (len(week_sessions) / goals['weekly_sessions']) * 100)
        },
        'target_score': {
            'current': avg_score,
            'target': goals['target_score'],
            'progress': min(100, (avg_score / goals['target_score']) * 100)
        },
        'consistency_target': {
            'current': consistency,
            'target': goals['consistency_target'],
            'progress': min(100, (consistency / goals['consistency_target']) * 100)
        }
    }

def calculate_severity_distribution(analysis_data):
    """Calculate distribution of severity levels"""
    if not analysis_data:
        return {'none': 0, 'mild': 0, 'severe': 0}
    
    severities = [a.severity for a in analysis_data if a.severity]
    total = len(severities)
    
    return {
        'none': severities.count('none') / total * 100 if total > 0 else 0,
        'mild': severities.count('mild') / total * 100 if total > 0 else 0,
        'severe': severities.count('severe') / total * 100 if total > 0 else 0
    }

def calculate_session_gaps(progress_data):
    """Calculate average gap between sessions"""
    if len(progress_data) < 2:
        return 0
    
    dates = [p.created_at.date() for p in progress_data]
    gaps = [(dates[i] - dates[i-1]).days for i in range(1, len(dates))]
    
    return sum(gaps) / len(gaps)

def calculate_stability_index(scores):
    """Calculate how stable the scores are"""
    if len(scores) < 2:
        return 100
    
    # Calculate coefficient of variation
    mean_score = sum(scores) / len(scores)
    variance = sum((score - mean_score) ** 2 for score in scores) / len(scores)
    std_dev = variance ** 0.5
    
    cv = (std_dev / mean_score) * 100 if mean_score > 0 else 0
    
    # Convert to stability index (lower CV = higher stability)
    return max(0, 100 - cv)

def generate_comprehensive_summary(all_progress, all_analyses):
    """Generate comprehensive user summary"""
    if not all_progress:
        return {'message': 'No data available for analysis'}
    
    total_sessions = len(all_progress)
    total_time = sum(p.session_duration or 0 for p in all_progress)
    
    scores = [p.score for p in all_progress]
    improvement = calculate_improvement_rate(scores)
    
    return {
        'total_sessions': total_sessions,
        'total_practice_time': total_time,
        'overall_improvement': improvement,
        'current_level': determine_current_level(scores[-10:] if len(scores) >= 10 else scores),
        'achievements': calculate_achievements(all_progress, all_analyses)
    }

def determine_current_level(recent_scores):
    """Determine user's current skill level"""
    if not recent_scores:
        return 'Beginner'
    
    avg_score = sum(recent_scores) / len(recent_scores)
    
    if avg_score >= 85:
        return 'Advanced'
    elif avg_score >= 70:
        return 'Intermediate'
    else:
        return 'Beginner'

def calculate_achievements(all_progress, all_analyses):
    """Calculate user achievements"""
    achievements = []
    
    if len(all_progress) >= 10:
        achievements.append('Dedicated Practitioner - 10+ sessions completed')
    
    if len(all_progress) >= 50:
        achievements.append('Speech Warrior - 50+ sessions completed')
    
    scores = [p.score for p in all_progress]
    if scores and max(scores) >= 90:
        achievements.append('Excellence Achieved - Scored 90+')
    
    streak = calculate_current_streak(all_progress[0].user_id if all_progress else None)
    if streak >= 7:
        achievements.append(f'Consistency Champion - {streak} day streak')
    
    return achievements

def calculate_detailed_trends(all_progress, all_analyses):
    """Calculate detailed trend analysis"""
    # Monthly trends
    monthly_data = {}
    
    for progress in all_progress:
        month_key = progress.created_at.strftime('%Y-%m')
        if month_key not in monthly_data:
            monthly_data[month_key] = {'scores': [], 'sessions': 0}
        monthly_data[month_key]['scores'].append(progress.score)
        monthly_data[month_key]['sessions'] += 1
    
    monthly_trends = []
    for month, data in sorted(monthly_data.items()):
        avg_score = sum(data['scores']) / len(data['scores'])
        monthly_trends.append({
            'month': month,
            'average_score': avg_score,
            'session_count': data['sessions'],
            'improvement': 0  # Calculate month-over-month improvement
        })
    
    # Calculate month-over-month improvement
    for i in range(1, len(monthly_trends)):
        prev_score = monthly_trends[i-1]['average_score']
        curr_score = monthly_trends[i]['average_score']
        improvement = ((curr_score - prev_score) / prev_score * 100) if prev_score > 0 else 0
        monthly_trends[i]['improvement'] = improvement
    
    return {
        'monthly_trends': monthly_trends,
        'best_month': max(monthly_trends, key=lambda x: x['average_score']) if monthly_trends else None,
        'most_active_month': max(monthly_trends, key=lambda x: x['session_count']) if monthly_trends else None
    }

def analyze_exercise_effectiveness(user_id):
    """Analyze which exercises are most effective for the user"""
    # Get progress data with exercise information
    progress_with_exercises = Progress.query.filter_by(user_id=user_id)\
        .filter(Progress.exercise_id.isnot(None)).all()
    
    if not progress_with_exercises:
        return {'message': 'No exercise-specific data available'}
    
    exercise_stats = {}
    
    for progress in progress_with_exercises:
        exercise_id = progress.exercise_id
        if exercise_id not in exercise_stats:
            exercise_stats[exercise_id] = {'scores': [], 'sessions': 0}
        exercise_stats[exercise_id]['scores'].append(progress.score)
        exercise_stats[exercise_id]['sessions'] += 1
    
    # Calculate effectiveness for each exercise
    effectiveness = []
    for exercise_id, stats in exercise_stats.items():
        avg_score = sum(stats['scores']) / len(stats['scores'])
        improvement = calculate_improvement_rate(stats['scores'])
        
        exercise = Exercise.query.get(exercise_id)
        exercise_name = exercise.name if exercise else f"Exercise {exercise_id}"
        
        effectiveness.append({
            'exercise_id': exercise_id,
            'exercise_name': exercise_name,
            'average_score': avg_score,
            'improvement_rate': improvement,
            'session_count': stats['sessions']
        })
    
    # Sort by effectiveness (combination of score and improvement)
    effectiveness.sort(key=lambda x: x['average_score'] + x['improvement_rate'], reverse=True)
    
    return {
        'most_effective': effectiveness[:3],
        'all_exercises': effectiveness
    }

def identify_improvement_patterns(all_progress):
    """Identify patterns in user improvement"""
    if len(all_progress) < 10:
        return {'message': 'Insufficient data for pattern analysis'}
    
    scores = [p.score for p in all_progress]
    
    # Identify improvement phases
    phases = []
    window_size = 5
    
    for i in range(0, len(scores) - window_size, window_size):
        window_scores = scores[i:i + window_size]
        avg_score = sum(window_scores) / len(window_scores)
        trend = calculate_improvement_rate(window_scores)
        
        phase_start = all_progress[i].created_at
        phase_end = all_progress[min(i + window_size - 1, len(all_progress) - 1)].created_at
        
        phases.append({
            'start_date': phase_start.isoformat(),
            'end_date': phase_end.isoformat(),
            'average_score': avg_score,
            'trend': trend,
            'phase_type': 'improving' if trend > 5 else 'stable' if trend > -5 else 'declining'
        })
    
    return {
        'improvement_phases': phases,
        'overall_pattern': analyze_overall_pattern(scores),
        'best_improvement_period': max(phases, key=lambda x: x['trend']) if phases else None
    }

def analyze_overall_pattern(scores):
    """Analyze the overall improvement pattern"""
    if len(scores) < 4:
        return 'insufficient_data'
    
    quarters = len(scores) // 4
    q1_avg = sum(scores[:quarters]) / quarters
    q4_avg = sum(scores[-quarters:]) / quarters
    
    overall_improvement = ((q4_avg - q1_avg) / q1_avg * 100) if q1_avg > 0 else 0
    
    if overall_improvement > 20:
        return 'strong_improvement'
    elif overall_improvement > 10:
        return 'moderate_improvement'
    elif overall_improvement > -10:
        return 'stable'
    else:
        return 'declining'

def generate_comparative_analysis(all_progress, all_analyses):
    """Generate comparative analysis against benchmarks"""
    if not all_progress:
        return {'message': 'No data for comparison'}
    
    user_avg = sum(p.score for p in all_progress) / len(all_progress)
    user_sessions = len(all_progress)
    
    # These would typically come from aggregate user data
    benchmarks = {
        'average_score_benchmark': 75,
        'active_user_sessions': 25,
        'improvement_rate_benchmark': 15
    }
    
    user_improvement = calculate_improvement_rate([p.score for p in all_progress])
    
    return {
        'score_comparison': {
            'user_average': user_avg,
            'benchmark': benchmarks['average_score_benchmark'],
            'percentile': calculate_percentile(user_avg, benchmarks['average_score_benchmark'])
        },
        'activity_comparison': {
            'user_sessions': user_sessions,
            'benchmark': benchmarks['active_user_sessions'],
            'activity_level': 'high' if user_sessions > benchmarks['active_user_sessions'] else 'moderate'
        },
        'improvement_comparison': {
            'user_improvement': user_improvement,
            'benchmark': benchmarks['improvement_rate_benchmark'],
            'performance': 'above_average' if user_improvement > benchmarks['improvement_rate_benchmark'] else 'average'
        }
    }

def calculate_percentile(user_value, benchmark):
    """Calculate approximate percentile based on benchmark"""
    if user_value >= benchmark:
        return min(95, 50 + (user_value - benchmark) / benchmark * 45)
    else:
        return max(5, 50 - (benchmark - user_value) / benchmark * 45)

def calculate_current_trend(recent_progress):
    """Calculate current short-term trend"""
    if len(recent_progress) < 2:
        return 'stable'
    
    scores = [p.score for p in recent_progress]
    improvement = calculate_improvement_rate(scores)
    
    if improvement > 10:
        return 'improving'
    elif improvement < -10:
        return 'declining'
    else:
        return 'stable'

def calculate_next_milestone(user_id):
    """Calculate what the next milestone should be"""
    recent_progress = Progress.query.filter_by(user_id=user_id)\
        .order_by(Progress.created_at.desc()).limit(10).all()
    
    if not recent_progress:
        return {'type': 'first_session', 'description': 'Complete your first practice session'}
    
    avg_score = sum(p.score for p in recent_progress) / len(recent_progress)
    total_sessions = Progress.query.filter_by(user_id=user_id).count()
    
    # Determine next milestone
    if total_sessions < 5:
        return {'type': 'consistency', 'description': 'Complete 5 practice sessions'}
    elif avg_score < 70:
        return {'type': 'score_improvement', 'description': 'Reach an average score of 70'}
    elif avg_score < 85:
        return {'type': 'score_improvement', 'description': 'Reach an average score of 85'}
    elif total_sessions < 25:
        return {'type': 'dedication', 'description': 'Complete 25 practice sessions'}
    else:
        return {'type': 'mastery', 'description': 'Maintain excellence with consistent high scores'}
