import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Star, Play, Image as ImageIcon } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { CommunityHighlights, CommunityMembers } from '@/entities';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CommunityPage() {
  const [highlights, setHighlights] = useState<CommunityHighlights[]>([]);
  const [members, setMembers] = useState<CommunityMembers[]>([]);
  const [isLoadingHighlights, setIsLoadingHighlights] = useState(true);
  const [isLoadingMembers, setIsLoadingMembers] = useState(true);
  const [hasNextHighlights, setHasNextHighlights] = useState(false);
  const [skipHighlights, setSkipHighlights] = useState(0);

  useEffect(() => {
    loadHighlights(0);
    loadMembers();
  }, []);

  const loadHighlights = async (skipValue: number) => {
    setIsLoadingHighlights(true);
    const result = await BaseCrudService.getAll<CommunityHighlights>('communityhighlights', {}, { limit: 12, skip: skipValue });
    
    if (skipValue === 0) {
      setHighlights(result.items);
    } else {
      setHighlights(prev => [...prev, ...result.items]);
    }
    
    setHasNextHighlights(result.hasNext);
    setSkipHighlights(result.nextSkip || 0);
    setIsLoadingHighlights(false);
  };

  const loadMembers = async () => {
    setIsLoadingMembers(true);
    const result = await BaseCrudService.getAll<CommunityMembers>('communitymembers', {}, { limit: 100 });
    const featured = result.items.filter(m => m.isFeatured);
    setMembers(featured.length > 0 ? featured : result.items.slice(0, 6));
    setIsLoadingMembers(false);
  };

  const loadMoreHighlights = () => {
    loadHighlights(skipHighlights);
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
              <Users className="w-16 h-16 text-primary" />
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-black text-white">
              Community
            </h1>
            <p className="font-paragraph text-xl text-off-white max-w-3xl mx-auto">
              Discover amazing content from our gaming community, meet featured members, and share your own highlights
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Members */}
      <section className="w-full py-24 bg-gradient-to-b from-background to-background/80">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-12">
              <Star className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white">Featured Members</h2>
            </div>

            <div className="min-h-[300px]">
              {isLoadingMembers ? null : members.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {members.map((member, index) => (
                    <motion.div
                      key={member._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Link to={`/community/members/${member._id}`}>
                        <div className="group h-full bg-gradient-to-br from-background to-background/50 border border-off-white/10 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300">
                          {member.avatar && (
                            <div className="relative h-64 overflow-hidden">
                              <Image
                                src={member.avatar}
                                alt={member.memberName || 'Member'}
                                width={400}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                              {member.isFeatured && (
                                <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-heading font-bold rounded flex items-center gap-1">
                                  <Star className="w-3 h-3" />
                                  Featured
                                </div>
                              )}
                            </div>
                          )}
                          <div className="p-6 space-y-4">
                            <h3 className="font-heading text-2xl font-bold text-white group-hover:text-primary transition-colors">
                              {member.memberName}
                            </h3>
                            <p className="font-paragraph text-off-white/70 line-clamp-3">
                              {member.bio}
                            </p>
                            <div className="flex items-center gap-3 pt-4 border-t border-off-white/10">
                              {member.twitterUrl && (
                                <a
                                  href={member.twitterUrl}
                                  onClick={(e) => e.stopPropagation()}
                                  className="w-10 h-10 flex items-center justify-center bg-off-white/5 rounded-lg hover:bg-primary/20 hover:text-primary transition-all duration-300"
                                  aria-label="Twitter"
                                >
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                  </svg>
                                </a>
                              )}
                              {member.twitchUrl && (
                                <a
                                  href={member.twitchUrl}
                                  onClick={(e) => e.stopPropagation()}
                                  className="w-10 h-10 flex items-center justify-center bg-off-white/5 rounded-lg hover:bg-secondary/20 hover:text-secondary transition-all duration-300"
                                  aria-label="Twitch"
                                >
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
                                  </svg>
                                </a>
                              )}
                              {member.youtubeUrl && (
                                <a
                                  href={member.youtubeUrl}
                                  onClick={(e) => e.stopPropagation()}
                                  className="w-10 h-10 flex items-center justify-center bg-off-white/5 rounded-lg hover:bg-primary/20 hover:text-primary transition-all duration-300"
                                  aria-label="YouTube"
                                >
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                  </svg>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-16">
                  <p className="font-paragraph text-off-white/50">No featured members available</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Community Highlights */}
      <section className="w-full py-24">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-12">
              <ImageIcon className="w-8 h-8 text-primary" />
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white">Community Highlights</h2>
            </div>

            <div className="min-h-[600px]">
              {isLoadingHighlights && highlights.length === 0 ? null : highlights.length > 0 ? (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {highlights.map((highlight, index) => (
                      <motion.div
                        key={highlight._id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="group relative bg-gradient-to-br from-background to-background/50 border border-off-white/10 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300"
                      >
                        {highlight.thumbnailUrl && (
                          <div className="relative h-72 overflow-hidden">
                            <Image
                              src={highlight.thumbnailUrl}
                              alt={highlight.title || 'Highlight'}
                              width={500}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                            {highlight.mediaType && (
                              <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-heading font-bold rounded flex items-center gap-1">
                                {highlight.mediaType === 'Video' && <Play className="w-3 h-3" />}
                                {highlight.mediaType}
                              </div>
                            )}
                            {highlight.mediaUrl && (
                              <a
                                href={highlight.mediaUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute inset-0 flex items-center justify-center bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <div className="w-16 h-16 flex items-center justify-center bg-primary rounded-full">
                                  <Play className="w-8 h-8 text-primary-foreground" />
                                </div>
                              </a>
                            )}
                          </div>
                        )}
                        <div className="p-6 space-y-3">
                          <h3 className="font-heading text-lg font-bold text-white group-hover:text-primary transition-colors line-clamp-2">
                            {highlight.title}
                          </h3>
                          <p className="font-paragraph text-sm text-off-white/70 line-clamp-2">
                            {highlight.description}
                          </p>
                          <div className="flex items-center justify-between pt-2 text-sm text-off-white/50 border-t border-off-white/10">
                            <span className="font-paragraph">{highlight.uploaderName}</span>
                            <span>{highlight.datePosted ? new Date(highlight.datePosted).toLocaleDateString() : ''}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {hasNextHighlights && (
                    <div className="flex justify-center mt-12">
                      <Button
                        onClick={loadMoreHighlights}
                        disabled={isLoadingHighlights}
                        className="px-8 py-4 bg-primary text-primary-foreground font-heading font-bold text-lg rounded-lg hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] transition-all duration-300"
                      >
                        Load More Highlights
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-24">
                  <ImageIcon className="w-16 h-16 text-off-white/20 mx-auto mb-6" />
                  <h3 className="font-heading text-2xl font-bold text-white mb-4">No Highlights Available</h3>
                  <p className="font-paragraph text-off-white/50">
                    Check back soon for amazing community content
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
