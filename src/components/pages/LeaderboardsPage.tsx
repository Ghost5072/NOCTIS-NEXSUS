import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Search, Medal } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Leaderboard } from '@/entities';
import { Image } from '@/components/ui/image';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LeaderboardsPage() {
  const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);
  const [filteredLeaderboard, setFilteredLeaderboard] = useState<Leaderboard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeGame, setActiveGame] = useState<string>('All Games');
  const [searchQuery, setSearchQuery] = useState('');

  const games = ['All Games', 'Blood Strike', 'Free Fire', 'CODM', 'PUBG', 'eFootball'];

  useEffect(() => {
    loadLeaderboard();
  }, []);

  useEffect(() => {
    filterLeaderboard();
  }, [activeGame, searchQuery, leaderboard]);

  const loadLeaderboard = async () => {
    setIsLoading(true);
    const result = await BaseCrudService.getAll<Leaderboard>('leaderboard', {}, { limit: 100 });
    const sorted = result.items.sort((a, b) => (a.rank || 0) - (b.rank || 0));
    setLeaderboard(sorted);
    setIsLoading(false);
  };

  const filterLeaderboard = () => {
    let filtered = [...leaderboard];

    if (activeGame !== 'All Games') {
      filtered = filtered.filter(player => player.gameTitle === activeGame);
    }

    if (searchQuery) {
      filtered = filtered.filter(player =>
        player.playerName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredLeaderboard(filtered);
  };

  const getRankColor = (rank?: number) => {
    if (rank === 1) return 'text-primary';
    if (rank === 2) return 'text-secondary';
    if (rank === 3) return 'text-off-white';
    return 'text-off-white/50';
  };

  const getRankBg = (rank?: number) => {
    if (rank === 1) return 'bg-primary/10 border-primary/30';
    if (rank === 2) return 'bg-secondary/10 border-secondary/30';
    if (rank === 3) return 'bg-off-white/10 border-off-white/30';
    return 'bg-background border-off-white/10';
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
            <h1 className="font-heading text-5xl md:text-7xl font-black text-white">
              Leaderboards
            </h1>
            <p className="font-paragraph text-xl text-off-white max-w-3xl mx-auto">
              Track the top players across all games and see where you rank
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="w-full py-12 border-b border-off-white/10">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="space-y-6">
            {/* Game Tabs */}
            <div className="flex flex-wrap gap-3">
              {games.map((game) => (
                <button
                  key={game}
                  onClick={() => setActiveGame(game)}
                  className={`px-6 py-3 font-heading font-bold rounded-lg transition-all duration-300 ${
                    activeGame === game
                      ? 'bg-primary text-primary-foreground shadow-[0_0_20px_rgba(0,217,255,0.3)]'
                      : 'bg-off-white/5 text-off-white hover:bg-off-white/10'
                  }`}
                >
                  {game}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-off-white/50" />
              <Input
                type="text"
                placeholder="Search players..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 bg-off-white/5 border-off-white/10 text-white placeholder:text-off-white/50 font-paragraph rounded-lg focus:border-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard Table */}
      <section className="w-full py-16">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="min-h-[600px]">
            {isLoading ? null : filteredLeaderboard.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                {/* Top 3 Podium */}
                {filteredLeaderboard.slice(0, 3).length === 3 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* 2nd Place */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="order-2 md:order-1"
                    >
                      <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/30 rounded-xl p-8 text-center space-y-4">
                        <div className="flex justify-center">
                          <Medal className="w-12 h-12 text-secondary" />
                        </div>
                        <div className="font-heading text-6xl font-black text-secondary">2</div>
                        {filteredLeaderboard[1].countryFlagImage && (
                          <Image
                            src={filteredLeaderboard[1].countryFlagImage}
                            alt="Flag"
                            width={48}
                            className="w-12 h-8 object-cover rounded mx-auto"
                          />
                        )}
                        <h3 className="font-heading text-2xl font-bold text-white">
                          {filteredLeaderboard[1].playerName}
                        </h3>
                        <p className="font-paragraph text-off-white/70">{filteredLeaderboard[1].gameTitle}</p>
                        <p className="font-heading text-3xl font-bold text-secondary">
                          {filteredLeaderboard[1].score?.toLocaleString()}
                        </p>
                      </div>
                    </motion.div>

                    {/* 1st Place */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="order-1 md:order-2"
                    >
                      <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 rounded-xl p-8 text-center space-y-4 md:-mt-8">
                        <div className="flex justify-center">
                          <Trophy className="w-16 h-16 text-primary" />
                        </div>
                        <div className="font-heading text-7xl font-black text-primary">1</div>
                        {filteredLeaderboard[0].countryFlagImage && (
                          <Image
                            src={filteredLeaderboard[0].countryFlagImage}
                            alt="Flag"
                            width={48}
                            className="w-12 h-8 object-cover rounded mx-auto"
                          />
                        )}
                        <h3 className="font-heading text-3xl font-bold text-white">
                          {filteredLeaderboard[0].playerName}
                        </h3>
                        <p className="font-paragraph text-off-white/70">{filteredLeaderboard[0].gameTitle}</p>
                        <p className="font-heading text-4xl font-bold text-primary">
                          {filteredLeaderboard[0].score?.toLocaleString()}
                        </p>
                      </div>
                    </motion.div>

                    {/* 3rd Place */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="order-3"
                    >
                      <div className="bg-gradient-to-br from-off-white/10 to-off-white/5 border border-off-white/30 rounded-xl p-8 text-center space-y-4">
                        <div className="flex justify-center">
                          <Medal className="w-12 h-12 text-off-white" />
                        </div>
                        <div className="font-heading text-6xl font-black text-off-white">3</div>
                        {filteredLeaderboard[2].countryFlagImage && (
                          <Image
                            src={filteredLeaderboard[2].countryFlagImage}
                            alt="Flag"
                            width={48}
                            className="w-12 h-8 object-cover rounded mx-auto"
                          />
                        )}
                        <h3 className="font-heading text-2xl font-bold text-white">
                          {filteredLeaderboard[2].playerName}
                        </h3>
                        <p className="font-paragraph text-off-white/70">{filteredLeaderboard[2].gameTitle}</p>
                        <p className="font-heading text-3xl font-bold text-off-white">
                          {filteredLeaderboard[2].score?.toLocaleString()}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* Full Rankings Table */}
                <div className="bg-gradient-to-br from-background to-background/50 border border-off-white/10 rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-off-white/10 bg-off-white/5">
                          <th className="px-6 py-4 text-left font-heading text-sm font-bold text-off-white/70">Rank</th>
                          <th className="px-6 py-4 text-left font-heading text-sm font-bold text-off-white/70">Player</th>
                          <th className="px-6 py-4 text-left font-heading text-sm font-bold text-off-white/70">Game</th>
                          <th className="px-6 py-4 text-right font-heading text-sm font-bold text-off-white/70">Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredLeaderboard.map((player, index) => (
                          <motion.tr
                            key={player._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.03 }}
                            className={`border-b border-off-white/5 hover:bg-primary/5 transition-colors ${getRankBg(player.rank)}`}
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <span className={`font-heading text-2xl font-bold ${getRankColor(player.rank)}`}>
                                  {player.rank}
                                </span>
                                {player.badgeImage && (
                                  <Image src={player.badgeImage} alt="Badge" width={24} className="w-6 h-6" />
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                {player.countryFlagImage && (
                                  <Image
                                    src={player.countryFlagImage}
                                    alt="Flag"
                                    width={24}
                                    className="w-6 h-4 object-cover rounded"
                                  />
                                )}
                                <span className="font-paragraph font-bold text-white">{player.playerName}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="font-paragraph text-off-white/70">{player.gameTitle}</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span className={`font-heading text-xl font-bold ${getRankColor(player.rank)}`}>
                                {player.score?.toLocaleString()}
                              </span>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-24">
                <Trophy className="w-16 h-16 text-off-white/20 mx-auto mb-6" />
                <h3 className="font-heading text-2xl font-bold text-white mb-4">No Players Found</h3>
                <p className="font-paragraph text-off-white/50">
                  {searchQuery ? 'Try a different search term' : 'No leaderboard data available for this game'}
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
