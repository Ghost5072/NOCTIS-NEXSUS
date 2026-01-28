import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, ArrowLeft, Star, Twitter, Youtube } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { CommunityMembers } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CommunityMemberPage() {
  const { id } = useParams<{ id: string }>();
  const [member, setMember] = useState<CommunityMembers | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMember();
  }, [id]);

  const loadMember = async () => {
    setIsLoading(true);
    const data = await BaseCrudService.getById<CommunityMembers>('communitymembers', id!);
    setMember(data);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="w-full py-12">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
          <Link
            to="/community"
            className="inline-flex items-center gap-2 font-heading font-bold text-primary hover:text-primary/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Community
          </Link>

          <div className="min-h-[600px]">
            {isLoading ? (
              <div className="flex items-center justify-center py-24">
                <LoadingSpinner />
              </div>
            ) : !member ? (
              <div className="text-center py-24">
                <Users className="w-16 h-16 text-off-white/20 mx-auto mb-6" />
                <h2 className="font-heading text-3xl font-bold text-white mb-4">Member Not Found</h2>
                <p className="font-paragraph text-off-white/50 mb-8">
                  The member profile you're looking for doesn't exist or has been removed.
                </p>
                <Link
                  to="/community"
                  className="inline-block px-8 py-4 bg-primary text-primary-foreground font-heading font-bold rounded-lg hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] transition-all duration-300"
                >
                  View Community
                </Link>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-12"
              >
                {/* Profile Header */}
                <div className="grid md:grid-cols-3 gap-12">
                  {/* Avatar */}
                  <div className="md:col-span-1">
                    <div className="relative">
                      {member.avatar && (
                        <div className="relative h-96 rounded-2xl overflow-hidden border border-off-white/10">
                          <Image
                            src={member.avatar}
                            alt={member.memberName || 'Member'}
                            width={500}
                            className="w-full h-full object-cover"
                          />
                          {member.isFeatured && (
                            <div className="absolute top-4 right-4 px-4 py-2 bg-primary text-primary-foreground font-heading font-bold rounded-lg flex items-center gap-2">
                              <Star className="w-4 h-4" />
                              Featured
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="md:col-span-2 space-y-8">
                    <div className="space-y-4">
                      <h1 className="font-heading text-4xl md:text-6xl font-black text-white">
                        {member.memberName}
                      </h1>
                      {member.isFeatured && (
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg">
                          <Star className="w-5 h-5 text-primary" />
                          <span className="font-heading font-bold text-primary">Featured Member</span>
                        </div>
                      )}
                    </div>

                    {member.bio && (
                      <div className="space-y-4">
                        <h2 className="font-heading text-2xl font-bold text-white">About</h2>
                        <p className="font-paragraph text-lg text-off-white/90 leading-relaxed">
                          {member.bio}
                        </p>
                      </div>
                    )}

                    {/* Social Links */}
                    <div className="space-y-4">
                      <h2 className="font-heading text-2xl font-bold text-white">Connect</h2>
                      <div className="flex flex-wrap gap-4">
                        {member.twitterUrl && (
                          <a
                            href={member.twitterUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 rounded-lg hover:border-primary transition-all duration-300"
                          >
                            <Twitter className="w-5 h-5 text-primary" />
                            <span className="font-heading font-bold text-white">Twitter</span>
                          </a>
                        )}
                        {member.twitchUrl && (
                          <a
                            href={member.twitchUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/30 rounded-lg hover:border-secondary transition-all duration-300"
                          >
                            <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
                            </svg>
                            <span className="font-heading font-bold text-white">Twitch</span>
                          </a>
                        )}
                        {member.youtubeUrl && (
                          <a
                            href={member.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 rounded-lg hover:border-primary transition-all duration-300"
                          >
                            <Youtube className="w-5 h-5 text-primary" />
                            <span className="font-heading font-bold text-white">YouTube</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Info Section */}
                <div className="bg-gradient-to-br from-background to-background/50 border border-off-white/10 rounded-2xl p-8 md:p-12">
                  <h2 className="font-heading text-3xl font-bold text-white mb-6">Community Contributions</h2>
                  <p className="font-paragraph text-lg text-off-white/70 leading-relaxed">
                    {member.memberName} is an active member of the Noctis Gaming Hub community, contributing to the growth
                    and success of Nigerian student esports. Follow their social channels to stay updated with their
                    latest gaming content and achievements.
                  </p>
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
