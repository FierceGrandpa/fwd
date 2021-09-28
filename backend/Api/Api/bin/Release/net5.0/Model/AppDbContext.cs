using Microsoft.EntityFrameworkCore;

namespace Api.Model
{
    // >dotnet ef migration add testMigration
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<OfferModel> Offers { get; set; }
        public DbSet<MarkModel> Marks { get; set; }
        public DbSet<ArticleModel> Articles { get; set; }
        public DbSet<ServiceModel> Services { get; set; }
    }
}
