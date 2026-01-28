import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Newspaper, ArrowRight } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { NewsArticles } from '@/entities';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NewsPage() {
  const [news, setNews] = useState<NewsArticles[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    loadNews(0);
  }, []);

  const loadNews = async (skipValue: number) => {
    setIsLoading(true);
    const result = await BaseCrudService.getAll<NewsArticles>('news', {}, { limit: 12, skip: skipValue });
    
    if (skipValue === 0) {
      setNews(result.items);
    } else {
      setNews(prev => [...prev, ...result.items]);
    }
    
    setHasNext(result.hasNext);
    setSkip(result.nextSkip || 0);
    setIsLoading(false);
  };

  const loadMore = () => {
    loadNews(skip);
  };

  const featuredArticle = news[0];
  const regularArticles = news.slice(1);

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
              <Newspaper className="w-16 h-16 text-primary" />
            </div>
            <h1 className="font-heading text-5xl md:text-7xl font-black text-white">
              News & Updates
            </h1>
            <p className="font-paragraph text-xl text-off-white max-w-3xl mx-auto">
              Stay updated with the latest gaming news, tournament announcements, and community highlights
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="w-full py-16">
          <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link to={`/news/${featuredArticle._id}`}>
                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 hover:border-primary transition-all duration-300">
                  <div className="grid md:grid-cols-2 gap-8">
                    {featuredArticle.featuredImage && (
                      <div className="relative h-96 md:h-full overflow-hidden">
                        <Image
                          src={featuredArticle.featuredImage}
                          alt={featuredArticle.title || 'Featured News'}
                          width={800}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-8 md:p-12 flex flex-col justify-center space-y-6">
                      <div className="inline-block px-4 py-2 bg-primary text-primary-foreground font-heading font-bold text-sm rounded-lg w-fit">
                        Featured
                      </div>
                      <h2 className="font-heading text-3xl md:text-4xl font-bold text-white group-hover:text-primary transition-colors">
                        {featuredArticle.title}
                      </h2>
                      <p className="font-paragraph text-lg text-off-white/70 line-clamp-3">
                        {featuredArticle.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-off-white/50 font-paragraph">
                        <span>{featuredArticle.author}</span>
                        <span>•</span>
                        <span>
                          {featuredArticle.publishDate ? new Date(featuredArticle.publishDate).toLocaleDateString() : ''}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-primary font-heading font-bold">
                        Read Article
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* News Grid */}
      <section className="w-full py-16">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="min-h-[600px]">
            {isLoading && news.length === 0 ? null : regularArticles.length > 0 ? (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {regularArticles.map((article, index) => (
                    <motion.div
                      key={article._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <Link to={`/news/${article._id}`}>
                        <div className="group h-full bg-gradient-to-br from-background to-background/50 border border-off-white/10 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300">
                          {article.featuredImage && (
                            <div className="relative h-56 overflow-hidden">
                              <Image
                                src={article.featuredImage}
                                alt={article.title || 'News'}
                                width={500}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                          )}
                          <div className="p-6 space-y-4">
                            <div className="flex items-center gap-2 text-sm text-off-white/50 font-paragraph">
                              <span>{article.author}</span>
                              <span>•</span>
                              <span>
                                {article.publishDate ? new Date(article.publishDate).toLocaleDateString() : ''}
                              </span>
                            </div>
                            <h3 className="font-heading text-xl font-bold text-white group-hover:text-primary transition-colors line-clamp-2">
                              {article.title}
                            </h3>
                            <p className="font-paragraph text-off-white/70 line-clamp-3">
                              {article.excerpt}
                            </p>
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
                      onClick={loadMore}
                      disabled={isLoading}
                      className="px-8 py-4 bg-primary text-primary-foreground font-heading font-bold text-lg rounded-lg hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] transition-all duration-300"
                    >
                      Load More Articles
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-24">
                <Newspaper className="w-16 h-16 text-off-white/20 mx-auto mb-6" />
                <h3 className="font-heading text-2xl font-bold text-white mb-4">No News Available</h3>
                <p className="font-paragraph text-off-white/50">
                  Check back soon for the latest updates
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
