import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Calendar, ArrowRight, Filter } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Tournaments } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournaments[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [activeGameFilter, setActiveGameFilter] = useState<string>('All Games');
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);

  const games = ['All Games', 'Blood Strike', 'Free Fire', 'CODM', 'PUBG', 'eFootball'];
  const statuses = ['All', 'Active', 'Upcoming', 'Completed'];

  const normalizeString = (str: string): string => {
    return str.toLowerCase().trim().replace(/\s+/g, '');
  };

  useEffect(() => {
    loadTournaments(0);
  }, [activeFilter, activeGameFilter]);

  const loadTournaments = async (skipValue: number) => {
    setIsLoading(true);
    // Fetch all tournaments to apply client-side filtering
    const result = await BaseCrudService.getAll<Tournaments>('tournaments', {}, { limit: 100 });
    
    let filtered = result.items;
    if (activeFilter !== 'All') {
      filtered = filtered.filter(t => t.status?.toLowerCase() === activeFilter.toLowerCase());
    }
    if (activeGameFilter !== 'All Games') {
      const normalizedFilter = normalizeString(activeGameFilter);
      filtered = filtered.filter(t => normalizeString(t.gameTitle || '') === normalizedFilter);
    }

    setTournaments(filtered);
    setHasNext(false);
    setSkip(0);
    setIsLoading(false);
  };



  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      {/* Hero Section */}
      <section className="w-full py-24 bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <div className="flex justify-center">
              <Trophy className="w-16 h-16 text-primary" />
            </div>
            <h2 className="md:text-6xl lg:text-7xl text-white sm:text-3xl text-3xl font-space-grotesk text-center uppercase font-bold">
              Tournaments
            </h2>
            <p className="font-paragraph text-xl text-off-white max-w-3xl mx-auto">
              Compete in Nigeria's premier student esports tournaments across multiple games
            </p>
          </motion.div>
        </div>
      </section>
      {/* Filters */}
      <section className="w-full py-12 border-b border-off-white/10">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="space-y-8">
            {/* Status Filter */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-primary" />
                <h3 className="font-heading text-lg font-bold text-white">Status</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => setActiveFilter(status)}
                    className={`px-6 py-3 font-heading font-bold rounded-lg transition-all duration-300 ${
                      activeFilter === status
                        ? 'bg-primary text-primary-foreground shadow-[0_0_20px_rgba(0,217,255,0.3)]'
                        : 'bg-off-white/5 text-off-white hover:bg-off-white/10'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Game Filter */}
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-bold text-white">Games</h3>
              <div className="flex flex-wrap gap-3">
                {games.map((game) => (
                  <button
                    key={game}
                    onClick={() => setActiveGameFilter(game)}
                    className={`px-6 py-3 font-heading font-bold rounded-lg transition-all duration-300 ${
                      activeGameFilter === game
                        ? 'bg-secondary text-secondary-foreground'
                        : 'bg-off-white/5 text-off-white hover:bg-off-white/10'
                    }`}
                  >
                    {game}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Tournaments Grid */}
      <section className="w-full py-16">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="min-h-[600px]">
            {isLoading && tournaments.length === 0 ? null : tournaments.length > 0 ? (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {tournaments.map((tournament, index) => (
                    <motion.div
                      key={tournament._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <Link to={`/tournaments/${tournament._id}`}>
                        <div className="group relative h-full bg-gradient-to-br from-background to-background/50 border border-off-white/10 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300">
                          {tournament.gameImage && (
                            <div className="relative h-56 overflow-hidden">
                              <Image
                                src={tournament.gameImage}
                                alt={tournament.gameTitle || 'Tournament'}
                                width={500}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                            </div>
                          )}
                          <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                              <span className={`px-3 py-1 text-xs font-heading font-bold rounded ${
                                tournament.status === 'Active' ? 'bg-primary text-primary-foreground' :
                                tournament.status === 'Upcoming' ? 'bg-secondary text-secondary-foreground' :
                                'bg-off-white/20 text-off-white'
                              }`}>
                                {tournament.status}
                              </span>
                            </div>
                            <h3 className="font-heading text-base sm:text-lg md:text-xl font-bold text-white group-hover:text-primary transition-colors line-clamp-2">
                              {tournament.tournamentName}
                            </h3>
                            <p className="font-paragraph text-off-white/70">{tournament.gameTitle}</p>
                            <div className="space-y-3 pt-4 border-t border-off-white/10">
                              <div className="flex items-center justify-between">
                                <span className="font-paragraph text-sm text-off-white/50">Prize Pool</span>
                                <span className="font-heading text-lg font-bold text-primary">
                                  ₦{tournament.prizePool?.toLocaleString()}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="font-paragraph text-sm text-off-white/50">Start Date</span>
                                <span className="font-paragraph text-sm text-white">
                                  {tournament.startDate ? new Date(tournament.startDate).toLocaleDateString() : 'TBA'}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-end pt-2">
                              <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>

                {hasNext && (
                  <div className="flex justify-center mt-12">
                    <Button
                      onClick={() => loadTournaments(skip)}
                      disabled={isLoading}
                      className="px-8 py-4 bg-primary text-primary-foreground font-heading font-bold text-lg rounded-lg hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] transition-all duration-300"
                    >
                      Load More Tournaments
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-24">
                <Trophy className="w-16 h-16 text-off-white/20 mx-auto mb-6" />
                <h3 className="font-heading text-2xl font-bold text-white mb-4">No Tournaments Found</h3>
                <p className="font-paragraph text-off-white/50">
                  Try adjusting your filters to see more results
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
