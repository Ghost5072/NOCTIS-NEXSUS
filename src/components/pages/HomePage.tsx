// HPI 1.7-G
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Trophy, Calendar, Users, ArrowRight, Flame, Target, Crosshair, Zap, ChevronRight, Globe, Shield, Gamepad2 } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Tournaments, Leaderboard, NewsArticles, CommunityHighlights } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// --- Utility Components ---

const SectionLabel = ({ number, title }: { number: string; title: string }) => (
  <div className="flex items-center gap-4 mb-8 opacity-80">
    <span className="font-heading font-bold text-primary text-lg tracking-widest">{number}</span>
    <div className="h-[1px] w-12 bg-primary/50" />
    <span className="font-paragraph text-sm uppercase tracking-widest text-off-white/70">{title}</span>
  </div>
);

const GlitchText = ({ text, className }: { text: string; className?: string }) => {
  return (
    <div className={`relative inline-block group ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-primary opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] transition-all duration-100 select-none">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-secondary opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] transition-all duration-100 select-none">
        {text}
      </span>
    </div>
  );
};

const CyberCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative group bg-background border border-white/5 overflow-hidden ${className}`}>
    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/50 transition-all group-hover:w-full group-hover:h-full group-hover:border-primary/30" />
    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/50 transition-all group-hover:w-full group-hover:h-full group-hover:border-primary/30" />
    <div className="relative z-10 h-full">
      {children}
    </div>
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
  </div>
);

export default function HomePage() {
  // --- Data Fidelity Protocol: Canonical Data Sources ---
  const [tournaments, setTournaments] = useState<Tournaments[]>([]);
  const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);
  const [news, setNews] = useState<NewsArticles[]>([]);
  const [highlights, setHighlights] = useState<CommunityHighlights[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- Scroll Hooks ---
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [tournamentsData, leaderboardData, newsData, highlightsData] = await Promise.all([
        BaseCrudService.getAll<Tournaments>('tournaments', {}, { limit: 6 }),
        BaseCrudService.getAll<Leaderboard>('leaderboard', {}, { limit: 5 }),
        BaseCrudService.getAll<NewsArticles>('news', {}, { limit: 3 }),
        BaseCrudService.getAll<CommunityHighlights>('communityhighlights', {}, { limit: 6 })
      ]);
      setTournaments(tournamentsData.items);
      setLeaderboard(leaderboardData.items);
      setNews(newsData.items);
      setHighlights(highlightsData.items);
    } catch (error) {
      console.error("Failed to load data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const featuredTournament = tournaments.find(t => t.status === 'Active') || tournaments[0];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip selection:bg-primary selection:text-background">
      {/* Global Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX }}
      />

      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Dynamic Background Grid */}
        <div className="absolute inset-0 z-0 perspective-1000">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
          <div className="absolute bottom-0 left-0 right-0 h-[50vh] bg-gradient-to-t from-background via-background/90 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8 relative"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full animate-pulse" />
            <div className="relative w-32 h-32 md:w-48 md:h-48 border border-primary/30 flex items-center justify-center rotate-45 overflow-hidden backdrop-blur-sm">
              <div className="w-full h-full absolute inset-0 bg-primary/5" />
              <span className="font-heading font-black text-6xl md:text-8xl text-white -rotate-45">N</span>
              <div className="absolute top-0 left-0 w-2 h-2 bg-primary" />
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-primary" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-6xl md:text-8xl lg:text-[10rem] leading-[0.9] font-black text-white tracking-tighter uppercase mix-blend-difference"
          >
            <GlitchText text="NOCTIS" />
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-off-white to-white/50">
              NEXUS
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 flex flex-col md:flex-row items-center gap-6"
          >
            <div className="h-[1px] w-12 md:w-24 bg-primary" />
            <p className="font-paragraph text-lg md:text-xl text-off-white/80 max-w-xl text-center md:text-left">
              The definitive esports command center for the next generation of Nigerian student gamers.
            </p>
            <div className="h-[1px] w-12 md:w-24 bg-primary" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 flex flex-wrap gap-6 justify-center"
          >
            <Link
              to="/tournaments"
              className="group relative px-8 py-4 bg-primary text-background font-heading font-bold text-lg uppercase tracking-wider overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Enter Arena <Crosshair className="w-5 h-5" />
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            </Link>
            <Link
              to="/community"
              className="group px-8 py-4 border border-white/20 text-white font-heading font-bold text-lg uppercase tracking-wider hover:bg-white/5 transition-colors"
            >
              Join The Ranks
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-heading tracking-[0.3em] text-primary/70 uppercase">Scroll to Initialize</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </section>

      {/* --- FEATURED TOURNAMENT (Sticky Layout) --- */}
      {featuredTournament && (
        <section className="relative w-full py-32 border-t border-white/5">
          <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-16">
            <SectionLabel number="01" title="Active Operation" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
              {/* Sticky Image Side */}
              <div className="lg:col-span-7 relative">
                <div className="sticky top-32">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative aspect-[16/9] lg:aspect-[4/3] w-full overflow-hidden rounded-sm border border-white/10 group"
                  >
                    {featuredTournament.gameImage ? (
                      <Image
                        src={featuredTournament.gameImage}
                        alt={featuredTournament.tournamentName || "Featured Tournament"}
                        width={1200}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
                      />
                    ) : (
                      <div className="w-full h-full bg-secondary/10 flex items-center justify-center">
                        <Gamepad2 className="w-24 h-24 text-white/20" />
                      </div>
                    )}
                    
                    {/* Overlay UI */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />
                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-primary text-background text-xs font-heading font-bold uppercase tracking-wider">
                          {featuredTournament.status}
                        </span>
                        <span className="px-3 py-1 border border-white/20 text-white text-xs font-heading font-bold uppercase tracking-wider backdrop-blur-md">
                          {featuredTournament.gameTitle}
                        </span>
                      </div>
                      <h2 className="font-heading text-4xl md:text-6xl font-black text-white uppercase leading-none mb-4">
                        {featuredTournament.tournamentName}
                      </h2>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Content Side */}
              <div className="lg:col-span-5 flex flex-col justify-center space-y-12">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="font-heading text-2xl text-primary mb-6">Mission Briefing</h3>
                  <p className="font-paragraph text-lg text-off-white/70 leading-relaxed mb-8">
                    Prepare for the ultimate showdown. The arena is set, the stakes are high, and only the elite will survive. 
                    Join the ranks of the best players in the region and fight for glory.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6 mb-12">
                    <div className="p-6 bg-white/5 border border-white/5 hover:border-primary/30 transition-colors">
                      <Trophy className="w-6 h-6 text-primary mb-3" />
                      <p className="text-xs text-off-white/50 uppercase tracking-wider mb-1">Prize Pool</p>
                      <p className="font-heading text-2xl font-bold text-white">₦{featuredTournament.prizePool?.toLocaleString()}</p>
                    </div>
                    <div className="p-6 bg-white/5 border border-white/5 hover:border-primary/30 transition-colors">
                      <Calendar className="w-6 h-6 text-primary mb-3" />
                      <p className="text-xs text-off-white/50 uppercase tracking-wider mb-1">Start Date</p>
                      <p className="font-heading text-2xl font-bold text-white">
                        {featuredTournament.startDate ? new Date(featuredTournament.startDate).toLocaleDateString() : 'TBA'}
                      </p>
                    </div>
                  </div>

                  <Link
                    to={`/tournaments/${featuredTournament._id}`}
                    className="inline-flex items-center justify-center w-full py-5 bg-white text-background font-heading font-bold text-lg uppercase tracking-wider hover:bg-primary transition-colors duration-300"
                  >
                    Register Now <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* --- TOURNAMENT HUB (Grid) --- */}
      <section className="w-full py-32 bg-background relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <SectionLabel number="02" title="War Room" />
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white uppercase">
                Tournament <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Hub</span>
              </h2>
            </div>
            <Link to="/tournaments" className="group flex items-center gap-2 text-off-white hover:text-primary transition-colors font-heading font-bold uppercase tracking-wider text-sm">
              View All Operations
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[400px] bg-white/5 animate-pulse rounded-sm" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tournaments.map((tournament, index) => (
                <motion.div
                  key={tournament._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/tournaments/${tournament._id}`}>
                    <CyberCard className="h-full flex flex-col">
                      <div className="relative h-64 overflow-hidden">
                        {tournament.gameImage ? (
                          <Image
                            src={tournament.gameImage}
                            alt={tournament.tournamentName || 'Tournament'}
                            width={600}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-secondary/20 flex items-center justify-center">
                            <Target className="w-12 h-12 text-white/20" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                        <div className="absolute top-4 right-4">
                          <span className={`px-3 py-1 text-xs font-heading font-bold uppercase tracking-wider backdrop-blur-md border ${
                            tournament.status === 'Active' ? 'bg-primary/20 border-primary text-primary' :
                            tournament.status === 'Upcoming' ? 'bg-secondary/20 border-secondary text-secondary' :
                            'bg-white/10 border-white/20 text-off-white'
                          }`}>
                            {tournament.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-8 flex-grow flex flex-col">
                        <h3 className="font-heading text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-1">
                          {tournament.tournamentName}
                        </h3>
                        <p className="font-paragraph text-sm text-off-white/60 mb-6 uppercase tracking-wider">
                          {tournament.gameTitle}
                        </p>
                        
                        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                          <div>
                            <p className="text-[10px] text-off-white/40 uppercase tracking-widest mb-1">Prize Pool</p>
                            <p className="font-heading text-lg font-bold text-white">₦{tournament.prizePool?.toLocaleString()}</p>
                          </div>
                          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-background transition-all">
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </CyberCard>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* --- LEADERBOARD (Data Table Style) --- */}
      <section className="w-full py-32 bg-[#0A0A0A] border-y border-white/5">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Header Side */}
            <div className="lg:col-span-4">
              <SectionLabel number="03" title="Elite Operatives" />
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white uppercase mb-6">
                Top <br /><span className="text-primary">Rankings</span>
              </h2>
              <p className="font-paragraph text-off-white/60 mb-8 max-w-md">
                The highest performing players across all active sectors. Climb the ranks to earn your place in the hall of fame.
              </p>
              <Link
                to="/leaderboards"
                className="inline-flex items-center gap-2 px-6 py-3 border border-primary/30 text-primary font-heading font-bold uppercase text-sm hover:bg-primary hover:text-background transition-all"
              >
                Full Leaderboard <Globe className="w-4 h-4" />
              </Link>
            </div>

            {/* Table Side */}
            <div className="lg:col-span-8">
              <div className="bg-white/5 border border-white/10 rounded-sm overflow-hidden backdrop-blur-sm">
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 bg-white/5 text-xs font-heading font-bold text-off-white/50 uppercase tracking-widest">
                  <div className="col-span-2 text-center">Rank</div>
                  <div className="col-span-6">Operative</div>
                  <div className="col-span-4 text-right">Score</div>
                </div>
                
                {isLoading ? (
                  <div className="p-8 text-center text-off-white/30 font-paragraph">Scanning database...</div>
                ) : leaderboard.length > 0 ? (
                  <div className="divide-y divide-white/5">
                    {leaderboard.map((player, index) => (
                      <motion.div
                        key={player._id}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/5 transition-colors group"
                      >
                        <div className="col-span-2 flex justify-center">
                          <span className={`font-heading font-black text-xl ${
                            index === 0 ? 'text-primary' : 
                            index === 1 ? 'text-secondary' : 
                            index === 2 ? 'text-white' : 'text-white/30'
                          }`}>
                            {String(player.rank).padStart(2, '0')}
                          </span>
                        </div>
                        <div className="col-span-6 flex items-center gap-4">
                          {player.countryFlagImage && (
                            <Image src={player.countryFlagImage} alt="Flag" width={24} className="w-6 h-4 object-cover opacity-70" />
                          )}
                          <div>
                            <p className="font-heading font-bold text-white group-hover:text-primary transition-colors">{player.playerName}</p>
                            <p className="text-xs text-off-white/40 font-paragraph uppercase">{player.gameTitle}</p>
                          </div>
                          {player.badgeImage && (
                            <Image src={player.badgeImage} alt="Badge" width={20} className="w-5 h-5 ml-2" />
                          )}
                        </div>
                        <div className="col-span-4 text-right">
                          <span className="font-heading font-bold text-white/90">{player.score?.toLocaleString()}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-off-white/30 font-paragraph">No data available</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- NEWS & COMMUNITY (Asymmetrical Layout) --- */}
      <section className="w-full py-32 bg-background relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-16">
          <SectionLabel number="04" title="Intel & Recon" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* News Column */}
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-3xl font-bold text-white uppercase">Latest Intel</h2>
                <Link to="/news" className="text-primary hover:text-white transition-colors text-sm font-heading font-bold uppercase">View All</Link>
              </div>

              <div className="space-y-6">
                {isLoading ? (
                  <div className="h-64 bg-white/5 animate-pulse" />
                ) : news.map((article, index) => (
                  <motion.div
                    key={article._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link to={`/news/${article._id}`} className="group block">
                      <div className="flex flex-col md:flex-row gap-6 p-4 border border-transparent hover:border-white/10 hover:bg-white/5 transition-all rounded-sm">
                        {article.featuredImage && (
                          <div className="w-full md:w-48 aspect-video overflow-hidden rounded-sm">
                            <Image
                              src={article.featuredImage}
                              alt={article.title || 'News'}
                              width={300}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 text-xs text-off-white/40 mb-2 font-paragraph uppercase">
                            <span className="text-primary">{article.author}</span>
                            <span>•</span>
                            <span>{article.publishDate ? new Date(article.publishDate).toLocaleDateString() : ''}</span>
                          </div>
                          <h3 className="font-heading text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="font-paragraph text-sm text-off-white/60 line-clamp-2">
                            {article.excerpt}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Community Highlights Column */}
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-3xl font-bold text-white uppercase">Community Feeds</h2>
                <Link to="/community" className="text-primary hover:text-white transition-colors text-sm font-heading font-bold uppercase">Explore</Link>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {isLoading ? (
                  [1, 2, 3, 4].map(i => <div key={i} className="aspect-square bg-white/5 animate-pulse" />)
                ) : highlights.map((highlight, index) => (
                  <motion.div
                    key={highlight._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="group relative aspect-square overflow-hidden border border-white/10 rounded-sm cursor-pointer">
                      {highlight.thumbnailUrl ? (
                        <Image
                          src={highlight.thumbnailUrl}
                          alt={highlight.title || 'Highlight'}
                          width={400}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-white/5 flex items-center justify-center">
                          <Zap className="w-8 h-8 text-white/20" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <span className="text-xs font-heading font-bold text-primary uppercase mb-1">{highlight.mediaType}</span>
                        <p className="text-sm font-bold text-white line-clamp-2">{highlight.title}</p>
                        <p className="text-xs text-off-white/70 mt-1">by {highlight.uploaderName}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="w-full py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,217,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[gradient_15s_linear_infinite]" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <Shield className="w-16 h-16 text-primary mx-auto mb-8" />
          <h3 className="font-heading text-5xl md:text-7xl font-black text-white uppercase mb-6">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Dominate?</span>
          </h3>
          <p className="font-paragraph text-xl text-off-white/70 mb-12 max-w-2xl mx-auto">
            Join the fastest growing student esports community in Nigeria. Compete in tournaments, connect with players, and build your legacy.
          </p>
          <Link
            to="/community"
            className="inline-block px-12 py-5 bg-white text-background font-heading font-bold text-xl uppercase tracking-wider hover:bg-primary transition-colors duration-300 clip-path-button"
            style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
          >
            Initialize Sequence
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}