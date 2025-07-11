// DashboardPage.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  BarChart2,
  Award,
  Clock,
  ArrowRight,
  Lightbulb,
  PlayCircle,
  Mic,
  Activity,
  Sparkles,
  X,
  Clock3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import SeverityBadge from '@/components/SeverityBadge';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Mic2 } from "lucide-react";
import { profileAPI, progressAPI } from '@/services/api';

const DashboardPage: React.FC = () => {
  const [selectedMood, setSelectedMood] = React.useState<string | null>(null);
  const [showScheduleModal, setShowScheduleModal] = React.useState(false);
  const [scheduledTime, setScheduledTime] = React.useState<string>('');
  const [profile, setProfile] = useState<any>(null);
  const [progress, setProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await profileAPI.getProfile();
        const progressData = await progressAPI.getHistory();
        setProfile(profileData);
        setProgress(progressData.history || []);
      } catch (err) {
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const tips = [
  'Speak slowly and take deep breaths before each sentence.',
  'Pause intentionally between words to give yourself space.',
  'Focus on the message, not perfection.',
  'Practice daily for just 10 minutes to build fluency.',
  'Record yourself and listen back with compassion.',
  'Celebrate even the smallest progress.',
  'Use gentle onset to start words softly.',
  'Try speaking while walking — it helps relax the body.',
  'Visualize fluency before a conversation.',
  'Maintain eye contact; it builds confidence.',
  'Breathe in fully before starting to speak.',
  'It’s okay to stutter — be kind to yourself.',
  'Practice reading aloud from a book or article.',
  'Use mirror practice to improve self-awareness.',
  'Don’t rush. Take your time.',
  'Positive self-talk goes a long way.',
  'Reduce background noise when you practice.',
  'Warm up with vocal exercises each morning.',
  'Try singing words instead of speaking them.',
  'Keep a journal of your speaking successes.',
  'Speak to a pet or plant — it’s great low-pressure practice.',
  'Remember, progress isn’t always linear.',
  'Avoid self-criticism — growth takes patience.',
  'Try whispering during practice to reduce tension.',
  'Practice phone calls — they build confidence.',
  'Practice in front of a friend you trust.',
  'Count to ten before answering if you feel anxious.',
  'Practice saying your name until it feels smooth.',
  'Learn to stutter openly and without shame.',
  'Use apps or games that encourage talking.',
  'Challenge yourself with one new word per day.',
  'Learn to breathe from your diaphragm.',
  'Don’t hide your stutter — own your voice.',
  'Use open-ended questions to keep conversations flowing.',
  'Practice mindfulness to calm pre-speech nerves.',
  'Break long words into smaller parts.',
  'Exaggerate your speech during warm-ups.',
  'Reduce caffeine if it increases your tension.',
  'Practice talking while doing chores.',
  'Take a few minutes to relax before speaking events.',
  'Remind yourself: stuttering does not define you.',
  'Join a support group — shared stories can help.',
  'Use rhythm — try tapping your fingers as you speak.',
  'Learn a tongue twister and master it slowly.',
  'Avoid avoidance — challenge speaking fears.',
  'Embrace silence when you need it.',
  'Make eye contact with a smile — it eases tension.',
  'Slow down — people will wait for you.',
  'Start with words that feel comfortable.',
  'Speak in front of a mirror each morning.',
  'Practice ordering food out loud at home.',
  'Use apps to monitor and celebrate progress.',
  'Record a short podcast for yourself.',
  'Practice group conversations with trusted people.',
  'Celebrate courage over fluency.',
  'Read poetry aloud — it helps with rhythm.',
  'Drink water often to keep your throat relaxed.',
  'Practice with tongue placement for tricky sounds.',
  'Don’t avoid hard words — practice them often.',
  'Set small goals — like introducing yourself to someone new.',
  'Acknowledge your feelings about speaking.',
  'Build vocabulary to feel more confident speaking.',
  'Speak in the car — it’s a no-pressure zone.',
  'Repeat affirmations like “I deserve to be heard.”',
  'Reward yourself after brave speaking moments.',
  'Play a character or role to reduce speaking pressure.',
  'Practice reading to children or pets.',
  'Use apps that simulate real-life speaking scenarios.',
  'Try gentle humming to relax vocal cords.',
  'Smile before speaking — it changes your mindset.',
  'Write scripts for daily conversations to rehearse.',
  'Breathe out slowly after finishing a sentence.',
  'Learn to identify your speaking triggers.',
  'Replace tension with curiosity when speaking.',
  'Read aloud with expression to build comfort.',
  'Practice introducing yourself to a mirror.',
  'Learn to stutter on purpose — it builds control.',
  'Try storytelling — real or made up — to practice flow.',
  'Join a speech club like Toastmasters.',
  'Focus on what you say, not how you say it.',
  'Use your hands to support expression when speaking.',
  'Avoid negative labels like “bad speaker.”',
  'Watch videos of confident speakers for inspiration.',
  'Speak in short phrases, not long sentences.',
  'Practice slowing your thoughts to match your speech.',
  'Try a calm breathing app before conversations.',
  'Speak to your reflection as if it’s a friend.',
  'Don’t fear stuttering in public — you’re not alone.',
  'Celebrate the courage it takes to speak.',
  'Rehearse job interviews out loud.',
  'Learn to pause and reset during speech blocks.',
  'Replace filler words with mindful pauses.',
  'Set a timer and talk for one uninterrupted minute.',
  'Let your shoulders relax before speaking.',
  'Learn from each experience — not just the good ones.',
  'Break your day into “talking opportunities.”',
  'Create a playlist of your favorite affirmations.',
  'Practice phone greetings until they feel natural.',
  'Use positive words when talking about your progress.',
  'Take breaks when you feel overwhelmed.',
  'Write out your thoughts before speaking them.',
  'Never compare your journey to someone else’s.',
  'You are more than your speech — never forget that.',
];


  const [currentTip, setCurrentTip] = React.useState<string>(tips[0]);

  const moods = [
    { label: '😊 Confident', value: 'confident' },
    { label: '😐 Okay', value: 'okay' },
    { label: '😟 Nervous', value: 'nervous' },
  ];

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setCurrentTip(randomTip);
  };

  const handleScheduleClick = () => {
    setShowScheduleModal(true);
  };

  const handleScheduleSave = () => {
    setShowScheduleModal(false);
  };

  const userData = {
    name: 'Jamie Smith',
    currentSeverity: 'mild' as 'none' | 'mild' | 'severe',
    sessionsCompleted: 8,
    minutesPracticed: 47,
    lastSession: '2 days ago',
    streak: 4,
    nextGoal: 'Complete 3 more sessions this week',
    progressPercent: 65,
    recentExercises: [
      { id: 1, name: 'Breath Control', completedAt: 'Today', duration: '5 min' },
      { id: 2, name: 'Paced Reading', completedAt: 'Yesterday', duration: '10 min' },
      { id: 3, name: 'Gentle Onset', completedAt: '3 days ago', duration: '8 min' },
    ],
    personalizedPlan: {
      goal: 'Reduce repetition and blocking episodes',
      strategies: ['Fluency drills', 'Breath pacing', 'Daily tracking'],
      duration: '3 weeks',
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

    if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        <p>No user data found. Please complete onboarding.</p>
      </div>
    );
    }


  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-therapy-peach-50 dark:from-gray-950 dark:to-gray-900 flex flex-col transition-colors duration-500">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">Loading dashboard...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">{error}</div>
        ) : profile && (
          <>
            {/* Scheduled Reminder */}
            {scheduledTime && (
              <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.4 }} className="mb-6">
                <Card className="bg-yellow-50 border-l-4 border-yellow-400 p-4 dark:bg-yellow-900/10">
                  <div className="flex items-center gap-2">
                    <Clock3 className="w-5 h-5 text-yellow-600 dark:text-yellow-300" />
                    <p className="text-sm text-yellow-800 dark:text-yellow-100 font-medium">
                      You have a session scheduled today at <span className="font-bold">{scheduledTime}</span>
                    </p>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Welcome Section */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }} className="mb-8">
              <h1 className="text-3xl font-bold text-therapy-purple-700 dark:text-therapy-purple-200">Welcome, {profile.name}</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Here's an overview of your speech therapy progress</p>
            </motion.div>

            {/* Summary Cards */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.1, duration: 0.5 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[{
                label: 'Current Severity',
                value: <SeverityBadge level={profile.currentSeverity} />, icon: <BarChart2 className="h-5 w-5 text-therapy-purple-500" />, bg: 'bg-therapy-purple-100 dark:bg-therapy-purple-500/20'
              }, {
                label: 'Sessions Completed',
                value: profile.sessionsCompleted, icon: <Calendar className="h-5 w-5 text-therapy-blue-500" />, bg: 'bg-therapy-blue-50 dark:bg-therapy-blue-500/20'
              }, {
                label: 'Current Streak',
                value: `${profile.streak} days`, icon: <Award className="h-5 w-5 text-green-600" />, bg: 'bg-therapy-green-100 dark:bg-green-900/20'
              }].map((card, idx) => (
                <Card key={idx} className="transition-shadow hover:shadow-xl dark:bg-gray-800 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{card.label}</p>
                        <div className="mt-2 text-xl font-semibold text-gray-800 dark:text-white">{card.value}</div>
                      </div>
                      <div className={`${card.bg} p-3 rounded-full`}>{card.icon}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

            {/* Today's Plan */}
            <motion.div
  initial="hidden"
  animate="visible"
  variants={fadeUp}
  transition={{ delay: 0.2, duration: 0.5 }}
  className="mb-8"
>
  <Card className="bg-gradient-to-r from-therapy-purple-50 to-blue-100 dark:from-therapy-purple-900 dark:to-therapy-purple-800 border-none shadow-lg">
    <CardHeader>
      <CardTitle className="text-xl font-semibold text-therapy-purple-700 dark:text-white">Today's Plan</CardTitle>
      <CardDescription className="text-therapy-purple-500 dark:text-therapy-purple-200">3-Week Strategy</CardDescription>
    </CardHeader>
    <CardContent className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <p className="text-sm text-gray-800 dark:text-gray-100 font-semibold mb-2">{profile.personalizedPlan?.goal}</p>
        <ul className="list-disc ml-5 space-y-1 text-sm text-gray-600 dark:text-gray-300">
          {profile.personalizedPlan?.strategies.map((item: string, idx: number) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-2 w-full md:w-auto">
        <Button asChild className="bg-therapy-purple-500 hover:bg-therapy-purple-600 text-white w-full md:w-auto">
          <Link to="/session">
            <PlayCircle className="w-4 h-4 mr-2" /> Start Session
          </Link>
        </Button>
        <Button
          variant="outline"
          className="text-therapy-purple-600 border-therapy-purple-400 dark:text-white"
          onClick={handleScheduleClick}
        >
          <Clock className="w-4 h-4 mr-2" /> Schedule Practice
        </Button>
      </div>
    </CardContent>
  </Card>

  {/* Schedule Modal */}
  <Dialog open={showScheduleModal} onOpenChange={setShowScheduleModal}>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" /> Schedule Practice
        </DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-4">
        <Input
          type="time"
          value={scheduledTime}
          onChange={(e) => setScheduledTime(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setShowScheduleModal(false)}>
            Cancel
          </Button>
          <Button onClick={handleScheduleSave} className="bg-therapy-purple-500 text-white">
            Save
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</motion.div>


            {/* Bonus Resource */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.3, duration: 0.5 }} className="mb-8">
              <Card className="bg-gradient-to-br from-therapy-purple-100 to-therapy-blue-50 dark:from-therapy-purple-800 dark:to-therapy-blue-900 border-none shadow-md">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-gray-800 dark:text-white">
                    <Lightbulb className="w-5 h-5 text-yellow-500" /> Bonus Resource
                  </h3>
                  <p className="mb-4 text-gray-800 dark:text-gray-300">Unlock insightful tips, exercises, and tools to improve fluency.</p>
                  <div className="pt-4">
                    <Button asChild className="bg-therapy-purple-500 hover:bg-therapy-purple-600 text-white">
                      <Link to="/bonus-resources">
                        View Bonus Resources <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.4, duration: 0.5 }} className="mb-8">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800 dark:text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-500" /> Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {progress.map((exercise) => (
                      <div key={exercise.id} className="flex justify-between items-center p-3 rounded-md bg-gray-100 dark:bg-gray-700">
                        <div className="text-gray-800 dark:text-white font-medium">{exercise.name}</div>
                        <div className="flex gap-2">
                          <Button variant="secondary" className="text-xs px-3 py-1 bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200">
                            {exercise.duration}
                          </Button>
                          <Button variant="secondary" className="text-xs px-3 py-1 bg-amber-100 text-amber-600 hover:bg-amber-200 dark:bg-amber-900 dark:text-amber-200">
                            {exercise.completedAt}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Speech Analysis Biweekly Check-In */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.25, duration: 0.5 }} className="mb-8">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800 dark:text-white flex items-center gap-2">
                    <Mic2 className="text-red-500" /> Biweekly Speech Analysis
                  </CardTitle>
                  <CardDescription className="text-gray-500 dark:text-gray-400">
                    Track your fluency progress with a quick check-in every two weeks.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="bg-therapy-red-500 hover:bg-therapy-red-600 text-white">
                    <Link to="/record">
                      <Mic className="w-4 h-4 mr-2" /> Start Analysis
                    </Link>
                  </Button> 
                    

                </CardContent>
              </Card>
            </motion.div>


                


            {/* Mood & Tip of the Day */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.5, duration: 0.5 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800 dark:text-white">Mood Tracker</CardTitle>
                  <CardDescription className="text-gray-500 dark:text-gray-400">Select your mood to get a daily tip</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    {moods.map((mood) => (
                      <Button
                        key={mood.value}
                        variant={selectedMood === mood.value ? 'default' : 'outline'}
                        onClick={() => handleMoodSelect(mood.value)}
                      >
                        {mood.label}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800 dark:text-white flex items-center gap-2">
                    <Sparkles className="text-yellow-500" /> Tip of the Day
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">{currentTip}</p>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
