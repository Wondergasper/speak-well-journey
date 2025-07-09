import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Video, Mic, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';

// const bonusResources = [
//   {
//     id: 1,
//     type: 'Podcast',
//     title: 'The Science of Stuttering',
//     description: 'Insights from speech therapists on fluency techniques.',
//     icon: <Mic className="text-purple-500" />,
//     link: '#',
//   },
//   {
//     id: 2,
//     type: 'PDF Guide',
//     title: 'Daily Fluency Checklist',
//     description: 'Printable guide to track your daily progress.',
//     icon: <FileText className="text-therapy-blue-500" />,
//     link: '#',
//   },
//   {
//     id: 3,
//     type: 'Video',
//     title: 'Breathing Techniques Explained',
//     description: 'Learn simple breathing methods from a therapist.',
//     icon: <Video className="text-amber-500" />,
//     link: '#',
//   },
// ];

const bonusResources = [
  {
    id: 1,
    type: 'Resource',
    title: 'Self-Esteem Journaling Prompts',
    description: 'Boost your confidence through reflective writing exercises.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://positivepsychology.com/self-esteem-journal-prompts/',
  },
  {
    id: 2,
    type: 'Resource',
    title: 'Daily Affirmations for Confidence',
    description: 'Empowering phrases to reinforce your self-belief.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://www.louisehay.com/affirmations/',
  },
  {
    id: 3,
    type: 'PDF Guide',
    title: 'CBT Techniques for Self-Esteem',
    description: 'Printable cognitive behavioral tools for improving self-esteem.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://www.therapistaid.com/worksheets/cbt-self-esteem.html',
  },
  {
    id: 4,
    type: 'Article',
    title: 'Mindfulness for Anxiety',
    description: 'Guided mindfulness strategies to reduce anxiety and increase focus.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://www.mindful.org/mindfulness-for-anxiety/',
  },
  {
    id: 5,
    type: 'Resource',
    title: 'Breathing Exercises for Anxiety',
    description: 'Simple breathing techniques to calm your nerves and speak clearly.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://www.healthline.com/health/breathing-exercise',
  },
  {
    id: 6,
    type: 'Resource',
    title: 'Meditation for Speaking Anxiety',
    description: 'Guided mindfulness strategies to reduce anxiety and increase focus.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://www.headspace.com/meditation/public-speaking',
  },
  {
    id: 7,
    type: 'Resource',
    title: 'Coping Cards for Anxiety',
    description: 'Helpful resource to support your speech therapy journey.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://www.cci.health.wa.gov.au/Resources/Looking-After-Yourself/Anxiety',
  },
  {
    id: 8,
    type: 'Resource',
    title: 'Positive Psychology for Confidence',
    description: 'Guided mindfulness strategies to reduce anxiety and increase focus.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://positivepsychology.com/confidence-interventions/',
  },
  {
    id: 9,
    type: 'Resource',
    title: 'Therapy Apps for Anxiety',
    description: 'Helpful resource to support your speech therapy journey.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://www.medicalnewstoday.com/articles/best-anxiety-apps',
  },
  {
    id: 10,
    type: 'Article',
    title: 'Mental Health Support - WHO',
    description: 'Helpful resource to support your speech therapy journey.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://www.who.int/teams/mental-health-and-substance-use',
  },
  {
    id: 11,
    type: 'Article',
    title: 'Inspiring Stories - NSA',
    description: 'Inspirational stories from individuals who stutter.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://westutter.org/resources/personal-stories/',
  },
  {
    id: 12,
    type: 'Article',
    title: 'Famous People Who Stutter',
    description: 'Inspirational stories from individuals who stutter.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://www.stutteringhelp.org/famous-people-who-stutter',
  },
  {
    id: 13,
    type: 'Article',
    title: 'Stuttering Success Stories',
    description: 'Inspirational stories from individuals who stutter.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://stamma.org/get-support/stories',
  },
  {
    id: 14,
    type: 'Video',
    title: 'Motivational TED Talks',
    description: 'Watch helpful videos designed to support your speech journey.',
    icon: <Video className="text-amber-500" />,
    link: 'https://www.ted.com/topics/motivation',
  },
  {
    id: 15,
    type: 'Video',
    title: 'Ed Sheeran on Overcoming Stuttering',
    description: 'Watch helpful videos designed to support your speech journey.',
    icon: <Video className="text-amber-500" />,
    link: 'https://www.youtube.com/watch?v=0G6C2FPRTtM',
  },
  {
    id: 16,
    type: 'Article',
    title: 'Understanding Stuttering - Mayo Clinic',
    description: 'Helpful resource to support your speech therapy journey.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://www.mayoclinic.org/diseases-conditions/stuttering/symptoms-causes/syc-20353572',
  },
  {
    id: 17,
    type: 'Article',
    title: 'How Stuttering Works - NIH',
    description: 'Helpful resource to support your speech therapy journey.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://www.nidcd.nih.gov/health/stuttering',
  },
  {
    id: 18,
    type: 'Article',
    title: 'Managing Relapse',
    description: 'Expert advice to improve daily communication with confidence.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://www.psychologytoday.com/us/blog/flourish/201007/7-tips-bouncing-back-relapse',
  },
  {
    id: 19,
    type: 'Article',
    title: 'Communication Tips for People Who Stutter',
    description: 'Expert advice to improve daily communication with confidence.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://www.stutteringhelp.org/ways-help-child-who-stutters',
  },
  {
    id: 20,
    type: 'Article',
    title: 'Guide for Parents',
    description: 'Helpful resource to support your speech therapy journey.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://www.asha.org/public/speech/disorders/stuttering.htm',
  },

    {
    id: 21,
    type: 'Book',
    title: 'Self-Therapy for the Stutterer',
    description: 'Recommended reading for personal growth and fluency strategies.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://www.stutteringhelp.org/self-therapy-stutterer',
  },
  {
    id: 22,
    type: 'Book',
    title: 'Out With It by Katherine Preston',
    description: 'Recommended reading for personal growth and fluency strategies.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://www.goodreads.com/book/show/15731869-out-with-it',
  },
  {
    id: 23,
    type: 'Book',
    title: 'Stuttering and Anxiety Self-Cures',
    description: 'Recommended reading for personal growth and fluency strategies.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://www.amazon.com/Stuttering-Anxiety-Self-Cures-Lee-Lovett/dp/0996410733',
  },
  {
    id: 24,
    type: 'Book',
    title: 'Advice to Those Who Stutter',
    description: 'Recommended reading for personal growth and fluency strategies.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://www.stutteringhelp.org/advice-those-who-stutter',
  },
  {
    id: 25,
    type: 'Book',
    title: 'More Books on Stuttering',
    description: 'Recommended reading for personal growth and fluency strategies.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://www.stutteringhelp.org/books-stuttering',
  },
  {
    id: 26,
    type: 'Podcast',
    title: 'StutterTalk Podcast',
    description: 'Listen to real conversations and expert advice about stuttering.',
    icon: <Mic className="text-purple-500" />,
    link: 'https://stuttertalk.com/',
  },
  {
    id: 27,
    type: 'Podcast',
    title: 'NSA Podcast',
    description: 'Listen to real conversations and expert advice about stuttering.',
    icon: <Mic className="text-purple-500" />,
    link: 'https://westutter.org/news/nsa-podcast/',
  },
  {
    id: 28,
    type: 'Video',
    title: 'Speech Therapy Video Exercises',
    description: 'Watch helpful videos designed to support your speech journey.',
    icon: <Video className="text-amber-500" />,
    link: 'https://www.youtube.com/c/TheStutteringFoundation',
  },
  {
    id: 29,
    type: 'Video',
    title: 'TEDx Talk: What I\'ve Learned From My Stutter',
    description: 'Watch helpful videos designed to support your speech journey.',
    icon: <Video className="text-amber-500" />,
    link: 'https://www.youtube.com/watch?v=fNY-dW-YfVQ',
  },
  {
    id: 30,
    type: 'Video',
    title: 'Understanding Your Stutter',
    description: 'Watch helpful videos designed to support your speech journey.',
    icon: <Video className="text-amber-500" />,
    link: 'https://www.youtube.com/watch?v=QmH2U7lmOeY',
  },
  {
    id: 31,
    type: 'Article',
    title: 'Stuttering Foundation',
    description: 'Helpful resource to support your speech therapy journey.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://www.stutteringhelp.org',
  },
  {
    id: 32,
    type: 'Article',
    title: 'National Stuttering Association',
    description: 'Helpful resource to support your speech therapy journey.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://westutter.org',
  },
  {
    id: 33,
    type: 'Article',
    title: 'British Stammering Association (STAMMA)',
    description: 'Helpful resource to support your speech therapy journey.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://stamma.org',
  },
  {
    id: 34,
    type: 'Article',
    title: 'Friends Who Stutter',
    description: 'Find a safe space to connect and share with others who stutter.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://www.friendswhostutter.org',
  },
  {
    id: 35,
    type: 'Article',
    title: 'Reddit: r/stutter',
    description: 'Find a safe space to connect and share with others who stutter.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://www.reddit.com/r/Stutter/',
  },
  {
    id: 36,
    type: 'Article',
    title: 'Facebook Support Group for Stuttering',
    description: 'Find a safe space to connect and share with others who stutter.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://www.facebook.com/groups/stutteringcommunity/',
  },
  {
    id: 37,
    type: 'Article',
    title: 'World Stuttering Network',
    description: 'Helpful resource to support your speech therapy journey.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://worldstutteringnetwork.net',
  },
  {
    id: 38,
    type: 'Article',
    title: 'International Stuttering Association',
    description: 'Helpful resource to support your speech therapy journey.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://www.isastutter.org/',
  },
  {
    id: 39,
    type: 'PDF Guide',
    title: 'Printable Affirmations PDF',
    description: 'Downloadable resources to support your speech practice.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://www.therapistaid.com/worksheets/self-esteem-journal.pdf',
  },
  {
    id: 40,
    type: 'PDF Guide',
    title: 'Speech Habit Tracker',
    description: 'Track your speech progress and emotional well-being daily.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://www.vertex42.com/ExcelTemplates/habit-tracker.html',
  },

    {
    id: 41,
    type: 'PDF Guide',
    title: 'CBT Thought Record',
    description: 'Printable cognitive behavioral tools for improving self-esteem.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://psychologytools.com/resource/cbt-thought-record/',
  },
  {
    id: 42,
    type: 'PDF Guide',
    title: 'Goal Setting Worksheet',
    description: 'Structured goal-setting resources to guide your growth.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://positivepsychology.com/goal-setting-worksheets/',
  },
  {
    id: 43,
    type: 'PDF Guide',
    title: 'Fluency Strategy Flashcards',
    description: 'Downloadable resources to support your speech practice.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://www.teacherspayteachers.com/Product/Fluency-Strategies-Flashcards-5944502',
  },
  {
    id: 44,
    type: 'Resource',
    title: 'Mood Tracker App',
    description: 'Track your speech progress and emotional well-being daily.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://daylio.webflow.io/',
  },
  {
    id: 45,
    type: 'Resource',
    title: 'Virtual Mirror Speech Practice',
    description: 'Practice speaking while observing yourself for confidence building.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://mirror.iatmlab.com/',
  },
  {
    id: 46,
    type: 'Resource',
    title: 'Speech Challenge Tracker',
    description: 'Structured goal-setting resources to guide your growth.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://www.habitica.com',
  },
  {
    id: 47,
    type: 'Resource',
    title: 'Online Journal - Penzu',
    description: 'Boost your confidence through reflective writing exercises.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://penzu.com/',
  },
  {
    id: 48,
    type: 'Resource',
    title: 'Simple Speech Therapy Games',
    description: 'Helpful resource to support your speech therapy journey.',
    icon: <FileText className="text-therapy-blue-500" />,
    link: 'https://www.home-speech-home.com/speech-therapy-games.html',
  },
  {
    id: 49,
    type: 'Video',
    title: 'YouTube: Stop Negative Self-Talk',
    description: 'Watch helpful videos designed to support your speech journey.',
    icon: <Video className="text-amber-500" />,
    link: 'https://youtu.be/eVFzbxmKNUw?si=NWX-5DKDc88XceSQ',
  },
  {
    id: 50,
    type: 'Video',
    title: 'YouTube: Mindset Shift for Stuttering',
    description: 'Watch helpful videos designed to support your speech journey.',
    icon: <Video className="text-amber-500" />,
    link: 'https://youtu.be/jpRqbP9Nv9k?si=msFSuE4albEiMKry',
  },
  {
    id: 51,
    type: 'Video',
    title: 'YouTube: How to Talk Confidently',
    description: 'Watch helpful videos designed to support your speech journey.',
    icon: <Video className="text-amber-500" />,
    link: 'https://youtu.be/JkB7hJan0Q0?si=dx5rMr60TLUQzc9f',
  },
  {
    id: 52,
    type: 'Video',
    title: 'YouTube: Overcome Fear of Speaking',
    description: 'Watch helpful videos designed to support your speech journey.',
    icon: <Video className="text-amber-500" />,
    link: 'https://youtu.be/w-HYZv6HzAs?si=4R1s1hfMdNmrYw1s',
  },
  {
    id: 53,
    type: 'Video',
    title: 'YouTube: Speaking Without Shame',
    description: 'Watch helpful videos designed to support your speech journey.',
    icon: <Video className="text-amber-500" />,
    link: 'https://youtu.be/l_NYrWqUR40?si=CdyNINIcCaOpZo_Z',
  },
  {
    id: 54,
    type: 'Video',
    title: 'YouTube: Letting Go of Judgement',
    description: 'Watch helpful videos designed to support your speech journey.',
    icon: <Video className="text-amber-500" />,
    link: 'https://youtu.be/mKW4ZFP8bGY?si=VwuovWDi5FAOM6w6',
  },
  {
    id: 55,
    type: 'Video',
    title: 'YouTube: How to Build Fluency',
    description: 'Watch helpful videos designed to support your speech journey.',
    icon: <Video className="text-amber-500" />,
    link: 'https://youtu.be/e7JNRf07bhA?si=u2gzPduYyZhVW-H-',
  },


];


const BonusResourcesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 dark:from-gray-950 dark:to-gray-900 transition-colors duration-500">
      <Navbar />

      <div className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-2">
            <Link to="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-therapy-purple-700 dark:text-white">Bonus Resources</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Curated tools to help you level up your speech therapy journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bonusResources.map((res) => (
            <Card key={res.id} className="transition-shadow hover:shadow-xl dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg text-gray-800 dark:text-white">{res.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-500 dark:text-gray-300">{res.description}</CardDescription>
                </div>
                <div className="p-2 bg-white dark:bg-gray-700 rounded-full">
                  {res.icon}
                </div>
              </CardHeader>
              <CardContent className="pt-0 mt-2">
                <Button asChild className="w-full bg-therapy-purple-500 hover:bg-therapy-purple-600 text-white">
                  <a href={res.link} target="_blank" rel="noopener noreferrer">
                    Access Resource
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BonusResourcesPage;
