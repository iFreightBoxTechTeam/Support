using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication2.Models
{
    public class IssueType
    {
        public int issuesid { get; set; }
        public string Issue_Type { get; set; }

        internal static void Add(IssueType issueType)
        {
            throw new NotImplementedException();
        }
    }
}