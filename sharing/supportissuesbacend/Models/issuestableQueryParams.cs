using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication2.Models
{
    public class issuestableQueryParams
    {
        public string SearchTerm { get; set; }
        public int PageNumber { get; set; } = 1;   // Default to 1 if not provided
        public int PageSize { get; set; } = 10;    // Default to 10 if not provided
    }
}
