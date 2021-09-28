using Api.Model;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Api
{
    public class Startup
    {
        public IWebHostEnvironment Env { get; }
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Env = env;
            Configuration = configuration;
        }
    
        public void ConfigureServices(IServiceCollection services)
        {
            var connection = Path.Combine(Env.ContentRootPath, "Model/db.db");

            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlite($"Data Source={connection}")
            );

            services.AddControllers();
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder
                        .AllowAnyMethod()
                        .AllowCredentials()
                        .SetIsOriginAllowed((host) => true)
                        .AllowAnyHeader());
            });
        }

        public void Configure(IApplicationBuilder app)
        {
            if (Env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Env.ContentRootPath, "Images")),
                RequestPath = "/Images"
            });

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors("CorsPolicy");

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
