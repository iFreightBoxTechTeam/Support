using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Web.Http;

using WebApplication2.Models;
using System.Configuration;
using System;

namespace userproblem.Controllers
{
    public class IssueTypeController : ApiController
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["webapi"].ConnectionString);

        [HttpGet]
        [Route("api/issuetype")]
        // GET api/issuetype
        public IEnumerable<IssueType> Get()
        {
            var issueTypes = new List<IssueType>();

            using (var cmd = new SqlCommand("sp_GetIssueType", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                conn.Open();

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        issueTypes.Add(new IssueType
                        {
                            issuesid = reader.GetInt32(reader.GetOrdinal("issuesid")),
                            Issue_Type = reader.GetString(reader.GetOrdinal("issue_type"))
                        });
                    }
                }
            }

            return issueTypes;
        }
        [HttpGet]
        [Route("api/issuetype/{issuesid}")]
        // GET api/issuetype/5
        public IssueType Get(int issuesid)
        {
            IssueType issueType = null;

            using (var cmd = new SqlCommand("sp_GetIssueTypeById", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@issuesid", issuesid);
                conn.Open();

                using (var reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        issueType = new IssueType
                        {
                            issuesid = reader.GetInt32(reader.GetOrdinal("issuesid")),
                            Issue_Type = reader.GetString(reader.GetOrdinal("issue_type"))
                        };
                    }
                }
            }

            return issueType;
        }
        [HttpPost]
        [Route("api/issuetype")]
        // POST api/issuetype
        public IHttpActionResult Post([FromBody] IssueType issue)
        {
            if (issue == null || string.IsNullOrWhiteSpace(issue.Issue_Type))
                return BadRequest("Issue type is required.");

            using (var cmd = new SqlCommand("sp_InsertIssueType", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@issue_type", issue.Issue_Type);
                conn.Open();
                cmd.ExecuteNonQuery();
            }

            return Ok("Issue type inserted successfully.");
        }

  
        // PUT api/issuetype/5
        [HttpPut]
        [Route("api/issuetype/{id}")]
        public IHttpActionResult Put(int id, [FromBody] IssueType issue)
        {
            if (issue == null || string.IsNullOrWhiteSpace(issue.Issue_Type))
                return BadRequest("Issue type is required.");

            using (var cmd = new SqlCommand("sp_UpdateIssueType", conn))
            {
                cmd.CommandType = CommandType.StoredProcedure;

                // Add both required parameters to the command
                cmd.Parameters.AddWithValue("@issuesid", id);
                cmd.Parameters.AddWithValue("@issue_type", issue.Issue_Type);

                conn.Open();
                cmd.ExecuteNonQuery();
            }

            return Ok("Issue type updated successfully.");
        }
        [HttpDelete]
        [Route("api/issuetype/{id}")]
        public IHttpActionResult Delete(int id)
        {
            try
            {
                
                using (SqlCommand cmd = new SqlCommand("sp_DeleteIssueType", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@issuesid", id); // MATCH the stored procedure

                    conn.Open();
                    cmd.ExecuteNonQuery();
                }

                return Ok($"Issue type with ID {id} deleted successfully.");
            }
            catch (SqlException ex)
            {
                return BadRequest($"SQL Error: {ex.Message}");
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

    }
}
