import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Calendar, Users, ExternalLink, ArrowLeft, FileText } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Tournaments } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TournamentDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [tournament, setTournament] = useState<Tournaments | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTournament();
  }, [id]);

  const loadTournament = async () => {
    setIsLoading(true);
    const data = await BaseCrudService.getById<Tournaments>('tournaments', id!);
    setTournament(data);
    setIsLoading(false);
  };

  const getAutomaticStatus = (tournament: Tournaments): string => {
    const now = new Date();
    const startDate = tournament.startDate ? new Date(tournament.startDate) : null;
    const completionDate = tournament.completionDate ? new Date(tournament.completionDate) : null;

    if (!startDate) return tournament.status || 'upcoming';

    if (completionDate && now > completionDate) {
      return 'completed';
    }

    if (now >= startDate && (!completionDate || now <= completionDate)) {
      return 'active';
    }

    return 'upcoming';
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="w-full py-12">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
          <Link
            to="/tournaments"
            className="inline-flex items-center gap-2 font-heading font-bold text-primary hover:text-primary/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Tournaments
          </Link>

          <div className="min-h-[600px]">
            {isLoading ? (
              <div className="flex items-center justify-center py-24">
                <LoadingSpinner />
              </div>
            ) : !tournament ? (
              <div className="text-center py-24">
                <Trophy className="w-16 h-16 text-off-white/20 mx-auto mb-6" />
                <h2 className="font-heading text-3xl font-bold text-white mb-4">Tournament Not Found</h2>
                <p className="font-paragraph text-off-white/50 mb-8">
                  The tournament you're looking for doesn't exist or has been removed.
                </p>
                <Link
                  to="/tournaments"
                  className="inline-block px-8 py-4 bg-primary text-primary-foreground font-heading font-bold rounded-lg hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] transition-all duration-300"
                >
                  View All Tournaments
                </Link>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-12"
              >
                {/* Hero Section */}
                <div className="relative rounded-2xl overflow-hidden">
                  {tournament.gameImage && (
                    <div className="relative h-96">
                      <Image
                        src={tournament.gameImage}
                        alt={tournament.gameTitle || 'Tournament'}
                        width={1200}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <div className="space-y-4">
                      <div className="inline-block px-4 py-2 bg-primary text-primary-foreground font-heading font-bold text-sm rounded-lg">
                        {getAutomaticStatus(tournament).charAt(0).toUpperCase() + getAutomaticStatus(tournament).slice(1)}
                      </div>
                      <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white break-words">
                        {tournament.tournamentName}
                      </h1>
                      <p className="font-paragraph text-2xl text-off-white">
                        {tournament.gameTitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 rounded-xl p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-primary/20 rounded-lg">
                        <Trophy className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-white">Prize Pool</h3>
                    </div>
                    <p className="font-heading text-3xl font-black text-primary">
                      ₦{tournament.prizePool?.toLocaleString()}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/30 rounded-xl p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-secondary/20 rounded-lg">
                        <Calendar className="w-6 h-6 text-secondary" />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-white">Start Date</h3>
                    </div>
                    <p className="font-heading text-2xl font-bold text-white">
                      {tournament.startDate ? new Date(tournament.startDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'To Be Announced'}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-off-white/10 to-off-white/5 border border-off-white/20 rounded-xl p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-off-white/10 rounded-lg">
                        <Users className="w-6 h-6 text-off-white" />
                      </div>
                      <h3 className="font-heading text-lg font-bold text-white">Status</h3>
                    </div>
                    <p className="font-heading text-2xl font-bold text-white">
                      {getAutomaticStatus(tournament).charAt(0).toUpperCase() + getAutomaticStatus(tournament).slice(1)}
                    </p>
                  </div>
                </div>

                {/* Details Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-8">
                    {/* Tournament Rules */}
                    {tournament.rulesUrl && (
                      <div className="bg-gradient-to-br from-background to-background/50 border border-off-white/10 rounded-xl p-8">
                        <div className="flex items-center gap-4 mb-6">
                          <FileText className="w-6 h-6 text-primary" />
                          <h2 className="font-heading text-2xl font-bold text-white">Tournament Rules</h2>
                        </div>
                        <a
                          href={tournament.rulesUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-heading font-bold rounded-lg hover:shadow-[0_0_20px_rgba(0,217,255,0.3)] transition-all duration-300"
                        >
                          View Rules
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </div>
                    )}

                    {/* Bracket */}
                    {tournament.bracketUrl && (
                      <div className="bg-gradient-to-br from-background to-background/50 border border-off-white/10 rounded-xl p-8">
                        <div className="flex items-center gap-4 mb-6">
                          <Trophy className="w-6 h-6 text-primary" />
                          <h2 className="font-heading text-2xl font-bold text-white">Tournament Bracket</h2>
                        </div>
                        <a
                          href={tournament.bracketUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground font-heading font-bold rounded-lg hover:shadow-[0_0_20px_rgba(107,70,193,0.3)] transition-all duration-300"
                        >
                          View Bracket
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </div>
                    )}

                    {/* Tournament Info */}
                    <div className="bg-gradient-to-br from-background to-background/50 border border-off-white/10 rounded-xl p-8">
                      <h2 className="font-heading text-2xl font-bold text-white mb-6">About This Tournament</h2>
                      <div className="space-y-4 font-paragraph text-off-white/70">
                        <p>
                          Join us for an exciting {tournament.gameTitle} tournament featuring Nigeria's best student gamers.
                          Compete for a prize pool of ₦{tournament.prizePool?.toLocaleString()} and prove your skills on the battlefield.
                        </p>
                        <p>
                          This tournament is part of the Noctis Gaming Hub initiative to promote esports culture
                          among Nigerian students and provide a platform for competitive gaming.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Registration CTA */}
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 rounded-xl p-8 text-center space-y-6">
                      <h3 className="font-heading text-2xl font-bold text-white">Ready to Compete?</h3>
                      <p className="font-paragraph text-off-white/70">
                        Register now to secure your spot in this tournament
                      </p>
                      <button
                      onClick={() => { if (tournament) { 
                        const phoneNumber = "2349155716184"; // your WhatsApp number in intl format 
                        const message = `Hello, I'd like to register for '${tournament.tournamentName}' (${tournament.gameTitle}) tournament.`; 
                        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`; 
                        window.open(whatsappLink, "_blank"); 
                        } 
                      }}
                       className="w-full px-8 py-4 bg-primary text-primary-foreground font-heading font-bold text-lg rounded-lg hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] transition-all duration-300">
                        Register Now
                      </button>
                    </div>

                    {/* Quick Info */}
                    <div className="bg-gradient-to-br from-background to-background/50 border border-off-white/10 rounded-xl p-8 space-y-4">
                      <h3 className="font-heading text-xl font-bold text-white mb-4">Quick Info</h3>
                      <div className="space-y-3 font-paragraph text-sm">
                        <div className="flex justify-between">
                          <span className="text-off-white/50">Game</span>
                          <span className="text-white font-bold">{tournament.gameTitle}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-off-white/50">Status</span>
                          <span className="text-white font-bold">{getAutomaticStatus(tournament).charAt(0).toUpperCase() + getAutomaticStatus(tournament).slice(1)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-off-white/50">Prize Pool</span>
                          <span className="text-primary font-bold">₦{tournament.prizePool?.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
