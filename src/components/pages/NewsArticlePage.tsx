import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Newspaper } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { NewsArticles } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NewsArticlePage() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<NewsArticles | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<NewsArticles[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadArticle();
  }, [id]);

  const loadArticle = async () => {
    setIsLoading(true);
    const [articleData, allArticles] = await Promise.all([
      BaseCrudService.getById<NewsArticles>('news', id!),
      BaseCrudService.getAll<NewsArticles>('news', {}, { limit: 4 })
    ]);
    
    setArticle(articleData);
    if (articleData) {
      const related = allArticles.items.filter(a => a._id !== articleData._id).slice(0, 3);
      setRelatedArticles(related);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="w-full py-12">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 font-heading font-bold text-primary hover:text-primary/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to News
          </Link>

          <div className="min-h-[600px]">
            {isLoading ? (
              <div className="flex items-center justify-center py-24">
                <LoadingSpinner />
              </div>
            ) : !article ? (
              <div className="text-center py-24">
                <Newspaper className="w-16 h-16 text-off-white/20 mx-auto mb-6" />
                <h2 className="font-heading text-3xl font-bold text-white mb-4">Article Not Found</h2>
                <p className="font-paragraph text-off-white/50 mb-8">
                  The article you're looking for doesn't exist or has been removed.
                </p>
                <Link
                  to="/news"
                  className="inline-block px-8 py-4 bg-primary text-primary-foreground font-heading font-bold rounded-lg hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] transition-all duration-300"
                >
                  View All News
                </Link>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <article className="max-w-4xl mx-auto space-y-8">
                  {/* Article Header */}
                  <div className="space-y-6">
                    <h1 className="font-heading text-4xl md:text-6xl font-black text-white">
                      {article.title}
                    </h1>
                    
                    <div className="flex flex-wrap items-center gap-6 text-off-white/70 font-paragraph">
                      <div className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        <span>
                          {article.publishDate ? new Date(article.publishDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          }) : ''}
                        </span>
                      </div>
                    </div>

                    {article.excerpt && (
                      <p className="font-paragraph text-xl text-off-white/90 leading-relaxed">
                        {article.excerpt}
                      </p>
                    )}
                  </div>

                  {/* Featured Image */}
                  {article.featuredImage && (
                    <div className="relative h-96 md:h-[600px] rounded-2xl overflow-hidden">
                      <Image
                        src={article.featuredImage}
                        alt={article.title || 'Article'}
                        width={1200}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Article Content */}
                  <div className="prose prose-invert prose-lg max-w-none">
                    <div className="font-paragraph text-off-white/90 leading-relaxed space-y-6 whitespace-pre-wrap">
                      {article.content}
                    </div>
                  </div>

                  {/* Article Footer */}
                  <div className="pt-12 border-t border-off-white/10">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <p className="font-paragraph text-sm text-off-white/50">Written by</p>
                        <p className="font-heading text-xl font-bold text-white">{article.author}</p>
                      </div>
                      <div className="space-y-2 text-right">
                        <p className="font-paragraph text-sm text-off-white/50">Published on</p>
                        <p className="font-heading text-xl font-bold text-white">
                          {article.publishDate ? new Date(article.publishDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          }) : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                  <section className="mt-24 pt-12 border-t border-off-white/10">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-12">
                      Related Articles
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {relatedArticles.map((relatedArticle) => (
                        <Link key={relatedArticle._id} to={`/news/${relatedArticle._id}`}>
                          <div className="group h-full bg-gradient-to-br from-background to-background/50 border border-off-white/10 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300">
                            {relatedArticle.featuredImage && (
                              <div className="relative h-48 overflow-hidden">
                                <Image
                                  src={relatedArticle.featuredImage}
                                  alt={relatedArticle.title || 'Related Article'}
                                  width={400}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                              </div>
                            )}
                            <div className="p-6 space-y-4">
                              <div className="flex items-center gap-2 text-sm text-off-white/50 font-paragraph">
                                <span>{relatedArticle.author}</span>
                                <span>•</span>
                                <span>
                                  {relatedArticle.publishDate ? new Date(relatedArticle.publishDate).toLocaleDateString() : ''}
                                </span>
                              </div>
                              <h3 className="font-heading text-lg font-bold text-white group-hover:text-primary transition-colors line-clamp-2">
                                {relatedArticle.title}
                              </h3>
                              <p className="font-paragraph text-sm text-off-white/70 line-clamp-2">
                                {relatedArticle.excerpt}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
