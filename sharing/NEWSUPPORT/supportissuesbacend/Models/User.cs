using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication1.Models;

namespace WebApplication2.Models
{
    public class User
    {
        public int issuesid { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Addresh { get; set; }
        public string Mobile_number { get; set; }




        public static implicit operator User(issuestable v)
        {
            throw new NotImplementedException();
        }
    }

}