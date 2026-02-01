import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Star, Play, Image as ImageIcon, MessageCircle, Music, Gamepad2, Youtube, Twitter } from 'lucide-react';
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
            <h2 className="font-heading md:text-5xl lg:text-7xl font-black text-white break-words text-3xl">
              Community
            </h2>
            <p className="font-paragraph text-base md:text-lg lg:text-xl text-off-white max-w-3xl mx-auto">
              Discover amazing content from our gaming community, meet featured members, and share your own highlights
            </p>
          </motion.div>
        </div>
      </section>
      {/* Community Socials */}
      <section className="w-full py-24 bg-gradient-to-b from-background/80 to-background">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12 text-center break-words">Join Our Community</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Twitter/X */}
              <motion.a
                href="https://x.com/NoctisGamingng"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0 }}
                className="group relative bg-gradient-to-br from-background to-background/50 border border-off-white/10 rounded-xl p-6 md:p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,217,255,0.2)]"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                    <Twitter className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading text-base md:text-lg lg:text-xl font-bold text-white text-center break-words">X (Twitter)</h3>
                  <p className="font-paragraph text-xs md:text-sm text-off-white/70 text-center break-words">@NoctisGamingng</p>
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                </div>
              </motion.a>

              {/* WhatsApp */}
              <motion.a
                href="https://chat.whatsapp.com/COCBgAtO6KdFs7jvQq8t1F"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="group relative bg-gradient-to-br from-background to-background/50 border border-off-white/10 rounded-xl p-6 md:p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,217,255,0.2)]"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                    <MessageCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading text-base md:text-lg lg:text-xl font-bold text-white text-center break-words">WhatsApp</h3>
                  <p className="font-paragraph text-xs md:text-sm text-off-white/70 text-center break-words">Noctis Community</p>
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                </div>
              </motion.a>

              {/* Discord */}
              <motion.a
                href="https://discord.gg/hcxheagU"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="group relative bg-gradient-to-br from-background to-background/50 border border-off-white/10 rounded-xl p-6 md:p-8 hover:border-secondary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(107,70,193,0.2)]"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-lg group-hover:from-secondary/30 group-hover:to-secondary/20 transition-all duration-300">
                    <svg className="w-8 h-8 text-secondary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.444.864-.607 1.25a18.27 18.27 0 0 0-5.487 0c-.163-.386-.395-.875-.607-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.042-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.294.075.075 0 0 1 .078-.01c3.928 1.793 8.18 1.793 12.062 0a.075.075 0 0 1 .079.009c.12.098.246.198.373.295a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.076.076 0 0 0-.041.107c.36.699.772 1.365 1.225 1.994a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.057c.5-4.761-.838-8.898-3.549-12.562a.06.06 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-.965-2.157-2.156 0-1.193.964-2.157 2.157-2.157 1.193 0 2.156.964 2.156 2.157 0 1.19-.963 2.156-2.156 2.156zm7.975 0c-1.183 0-2.157-.965-2.157-2.156 0-1.193.964-2.157 2.157-2.157 1.193 0 2.157.964 2.157 2.157 0 1.19-.964 2.156-2.157 2.156z" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-base md:text-lg lg:text-xl font-bold text-white text-center break-words">Discord</h3>
                  <p className="font-paragraph text-xs md:text-sm text-off-white/70 text-center break-words">Noctis Server</p>
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                </div>
              </motion.a>

              {/* TikTok */}
              <motion.a
                href="https://www.tiktok.com/@noctisgaming.ng?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="group relative bg-gradient-to-br from-background to-background/50 border border-off-white/10 rounded-xl p-6 md:p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,217,255,0.2)]"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                    <Music className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading text-base md:text-lg lg:text-xl font-bold text-white text-center break-words">TikTok</h3>
                  <p className="font-paragraph text-xs md:text-sm text-off-white/70 text-center break-words">@noctisgaming.ng</p>
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                </div>
              </motion.a>

              {/* Twitch */}
              <motion.a
                href="https://www.twitch.tv/n0ctisng"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="group relative bg-gradient-to-br from-background to-background/50 border border-off-white/10 rounded-xl p-6 md:p-8 hover:border-secondary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(107,70,193,0.2)]"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-lg group-hover:from-secondary/30 group-hover:to-secondary/20 transition-all duration-300">
                    <svg className="w-8 h-8 text-secondary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-base md:text-lg lg:text-xl font-bold text-white text-center break-words">Twitch</h3>
                  <p className="font-paragraph text-xs md:text-sm text-off-white/70 text-center break-words">@n0ctisng</p>
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                </div>
              </motion.a>

              {/* YouTube */}
              <motion.a
                href="https://youtube.com/@noctisgamingng?si=UDsRzXgDrvktoErM"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="group relative bg-gradient-to-br from-background to-background/50 border border-off-white/10 rounded-xl p-6 md:p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,217,255,0.2)]"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                    <Youtube className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading text-base md:text-lg lg:text-xl font-bold text-white text-center break-words">YouTube</h3>
                  <p className="font-paragraph text-xs md:text-sm text-off-white/70 text-center break-words">@noctisgamingng</p>
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                </div>
              </motion.a>
            </div>
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
            <div className="flex items-center gap-4 mb-12 flex-wrap">
              <Star className="w-8 h-8 text-primary flex-shrink-0" />
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white break-words">Featured Members</h2>
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
                            <h3 className="font-heading text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors break-words">
                              {member.memberName}
                            </h3>
                            <p className="font-paragraph text-sm md:text-base text-off-white/70 line-clamp-3">
                              {member.bio}
                            </p>
                            <div className="flex items-center gap-3 pt-4 border-t border-off-white/10 flex-wrap">
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
            <div className="flex items-center gap-4 mb-12 flex-wrap">
              <ImageIcon className="w-8 h-8 text-primary flex-shrink-0" />
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white break-words">Community Highlights</h2>
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
                          <h3 className="font-heading text-base md:text-lg font-bold text-white group-hover:text-primary transition-colors line-clamp-2 break-words">
                            {highlight.title}
                          </h3>
                          <p className="font-paragraph text-xs md:text-sm text-off-white/70 line-clamp-2">
                            {highlight.description}
                          </p>
                          <div className="flex items-center justify-between pt-2 text-xs md:text-sm text-off-white/50 border-t border-off-white/10 flex-wrap gap-2">
                            <span className="font-paragraph break-words">{highlight.uploaderName}</span>
                            <span className="flex-shrink-0">{highlight.datePosted ? new Date(highlight.datePosted).toLocaleDateString() : ''}</span>
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
                        className="px-6 md:px-8 py-3 md:py-4 bg-primary text-primary-foreground font-heading font-bold text-sm md:text-lg rounded-lg hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] transition-all duration-300"
                      >
                        Load More Highlights
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-24">
                  <ImageIcon className="w-16 h-16 text-off-white/20 mx-auto mb-6" />
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-4">No Highlights Available</h3>
                  <p className="font-paragraph text-sm md:text-base text-off-white/50">
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
