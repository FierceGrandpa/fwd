using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Model
{
    public class OfferModel : Entity
    {
        [Column(TypeName = "nvarchar(250)")]
        public string Name { get; set; }

        public int Price { get; set; }

        public ServiceModel Service { get; set; }
        public int ServiceId { get; set; }
    }
}
