USE [master]
GO
/****** Object:  Database [isssues]    Script Date: 23-06-2025 17:42:53 ******/
CREATE DATABASE [isssues]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'isssues', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\isssues.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'isssues_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\isssues_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [isssues] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [isssues].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [isssues] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [isssues] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [isssues] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [isssues] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [isssues] SET ARITHABORT OFF 
GO
ALTER DATABASE [isssues] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [isssues] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [isssues] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [isssues] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [isssues] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [isssues] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [isssues] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [isssues] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [isssues] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [isssues] SET  DISABLE_BROKER 
GO
ALTER DATABASE [isssues] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [isssues] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [isssues] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [isssues] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [isssues] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [isssues] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [isssues] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [isssues] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [isssues] SET  MULTI_USER 
GO
ALTER DATABASE [isssues] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [isssues] SET DB_CHAINING OFF 
GO
ALTER DATABASE [isssues] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [isssues] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [isssues] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [isssues] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [isssues] SET QUERY_STORE = OFF
GO
USE [isssues]
GO
/****** Object:  Table [dbo].[img_table]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[img_table](
	[issues_id] [uniqueidentifier] NOT NULL,
	[issuesTableid] [uniqueidentifier] NOT NULL,
	[imagepath] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[issues_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[issues]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[issues](
	[issues_id] [uniqueidentifier] NOT NULL,
	[descriptions] [varchar](255) NULL,
	[imagepath] [varchar](255) NULL,
	[statusid] [uniqueidentifier] NULL,
	[name] [nvarchar](100) NOT NULL,
	[tenantcode] [nvarchar](50) NOT NULL,
	[Raised_date] [datetime] NOT NULL,
	[userid] [int] NOT NULL,
	[assign_to] [varchar](255) NULL,
	[module] [nvarchar](100) NULL,
	[resolve_date] [datetime] NULL,
	[taken_time] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[issues_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[issuetype]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[issuetype](
	[issuesid] [int] IDENTITY(1,1) NOT NULL,
	[issue_type] [nvarchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[issuesid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[statuslog]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[statuslog](
	[issues_id] [uniqueidentifier] NOT NULL,
	[statusid] [uniqueidentifier] NOT NULL,
	[issuesTableid] [uniqueidentifier] NOT NULL,
	[logtime] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[issues_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[statuslogs]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[statuslogs](
	[issues_id] [uniqueidentifier] NOT NULL,
	[statusid] [uniqueidentifier] NOT NULL,
	[issuesTableid] [uniqueidentifier] NOT NULL,
	[logtime] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[issues_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[sttabble]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sttabble](
	[statusid] [uniqueidentifier] NOT NULL,
	[statusname] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[statusid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[users]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[issuesid] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](100) NOT NULL,
	[email] [varchar](255) NOT NULL,
	[addresh] [varchar](255) NULL,
	[mobile_number] [varchar](15) NULL,
	[password_hash] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[issuesid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[img_table] ADD  DEFAULT (newid()) FOR [issues_id]
GO
ALTER TABLE [dbo].[issues] ADD  DEFAULT (newid()) FOR [issues_id]
GO
ALTER TABLE [dbo].[issues] ADD  DEFAULT (getdate()) FOR [Raised_date]
GO
ALTER TABLE [dbo].[statuslog] ADD  DEFAULT (newid()) FOR [issues_id]
GO
ALTER TABLE [dbo].[statuslog] ADD  DEFAULT (getdate()) FOR [logtime]
GO
ALTER TABLE [dbo].[statuslogs] ADD  DEFAULT (newid()) FOR [issues_id]
GO
ALTER TABLE [dbo].[statuslogs] ADD  DEFAULT (getdate()) FOR [logtime]
GO
ALTER TABLE [dbo].[sttabble] ADD  DEFAULT (newid()) FOR [statusid]
GO
ALTER TABLE [dbo].[img_table]  WITH CHECK ADD FOREIGN KEY([issuesTableid])
REFERENCES [dbo].[issues] ([issues_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[issues]  WITH CHECK ADD FOREIGN KEY([statusid])
REFERENCES [dbo].[sttabble] ([statusid])
GO
ALTER TABLE [dbo].[statuslog]  WITH CHECK ADD FOREIGN KEY([issuesTableid])
REFERENCES [dbo].[issues] ([issues_id])
GO
ALTER TABLE [dbo].[statuslog]  WITH CHECK ADD  CONSTRAINT [FK__statuslog__matableid] FOREIGN KEY([issuesTableid])
REFERENCES [dbo].[issues] ([issues_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[statuslog] CHECK CONSTRAINT [FK__statuslog__matableid]
GO
ALTER TABLE [dbo].[statuslog]  WITH CHECK ADD FOREIGN KEY([statusid])
REFERENCES [dbo].[sttabble] ([statusid])
GO
ALTER TABLE [dbo].[statuslogs]  WITH CHECK ADD FOREIGN KEY([issuesTableid])
REFERENCES [dbo].[issues] ([issues_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[statuslogs]  WITH CHECK ADD FOREIGN KEY([statusid])
REFERENCES [dbo].[sttabble] ([statusid])
GO
/****** Object:  StoredProcedure [dbo].[DeleteUserById]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE  Or Alter PROCEDURE DeleteUserById
    @issuesid INT
AS
BEGIN
    
        DELETE FROM users
        WHERE issuesid = @issuesid;

   
END;  
GO
/****** Object:  StoredProcedure [dbo].[export]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE  [dbo].[export]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        m.issues_id AS issuesTableid,
        m.name,
        m.descriptions,
        m.tenantcode,
        m.Raised_date,
        m.userid,
        s.statusname,
        m.module,
      
        m.assign_to,
        m.resolve_date,
        -- taken_time in minutes between Raised_date and resolve_date
        CASE 
            WHEN m.resolve_date IS NOT NULL THEN DATEDIFF(MINUTE, m.Raised_date, m.resolve_date)
            ELSE NULL
        END AS taken_time,
        -- Concatenate image paths as comma-separated string
        ISNULL(STUFF((
            SELECT ',' + mi.imagepath
            FROM img_table mi
            WHERE mi.issuesTableid = m.issues_id 
            FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'), 1, 1, ''), '') AS imagepaths
    FROM issues m
    JOIN sttabble s ON m.statusid = s.statusid;
END;

-- Additional simple select to get issues_id , name, descriptions and taken_time from issues
-- with the same taken_time calculation
SELECT 
    issues_id , 
    name, 
    descriptions,
    CASE 
        WHEN resolve_date IS NOT NULL THEN DATEDIFF(MINUTE, Raised_date, resolve_date)
        ELSE NULL
    END AS taken_time
FROM issues;
GO
/****** Object:  StoredProcedure [dbo].[GetUser]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[GetUser]
    
AS
BEGIN
    SELECT issuesid , name, email,addresh,mobile_number
    FROM users
    
END;
GO
/****** Object:  StoredProcedure [dbo].[GetUserByName]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE    PROCEDURE [dbo].[GetUserByName]
    @name VARCHAR(100)
AS
BEGIN
    SELECT issuesid , name, email,addresh,mobile_number
    FROM users
    WHERE name = @name;
END;
GO
/****** Object:  StoredProcedure [dbo].[InsertUser]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE   PROCEDURE [dbo].[InsertUser]
    @name VARCHAR(100),
    @Email NVARCHAR(100),
	@password_hash varchar(255),
    @Mobile_number NVARCHAR(20),
    @Addresh NVARCHAR(200)
AS
BEGIN

    -- Check if the email already exists
    IF EXISTS (SELECT 1 FROM users WHERE email = @email)
    BEGIN
        RAISERROR('Email already exists.', 16, 1);
        RETURN;
    END

    -- Insert the new user
    INSERT INTO users (name, email,mobile_number,addresh, password_hash)
    VALUES (@name, @Email,@Mobile_number,@Addresh, @password_hash);
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_DeleteAssign_to]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE    PROCEDURE [dbo].[sp_DeleteAssign_to]
    @issues_id INT
AS
BEGIN
    DELETE FROM assign_to
    WHERE issues_id = @issues_id ;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_DeleteIssue_Type]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_DeleteIssue_Type]
    @issuesid INT
AS
BEGIN
    DELETE FROM issuetype
    WHERE issuesid = @issuesid ;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_Deleteissues]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[sp_Deleteissues]
    @userid INT
AS
BEGIN
    DECLARE @issuesTableid UNIQUEIDENTIFIER

    SELECT @issuesTableid = issues_id FROM issues WHERE userid = @userid;

    -- Delete statuslog entries first
    DELETE FROM statuslog WHERE issuesTableid = @issuesTableid;

    -- Then delete the issues entry
    DELETE FROM issues WHERE userid = @userid;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_DeleteStatus]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_DeleteStatus]
    @statusid UNIQUEIDENTIFIER
AS
BEGIN
    DELETE FROM sttabble
    WHERE statusid = @statusid;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAllStatuses]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetAllStatuses]
AS
BEGIN
    SELECT * FROM sttabble;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAllStatusLog]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[sp_GetAllStatusLog]
AS
BEGIN
    SELECT 
        sl.issues_id ,
        sl.statusid,
        sl.issuesTableid,
        sl.logtime,
        s.statusname,
        m.name AS matable_name
    FROM statuslog sl
    JOIN sttabble s ON sl.statusid = s.statusid
    JOIN issues m ON sl.issuesTableid = m.issues_id 
    ORDER BY sl.logtime DESC;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetAssign_to]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[sp_GetAssign_to]
AS
BEGIN
    SELECT issues_id , devname FROM assign_to;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_Getbyuserid]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[sp_Getbyuserid]
    @userid INT
AS
BEGIN
    SELECT
        m.issues_id ,
        m.descriptions,
        ISNULL(STUFF((
            SELECT ',' + mi.imagepath
            FROM img_table mi
            WHERE mi.issuesTableid = m.issues_id 
            FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'), 1, 1, ''), '') AS imagepaths,
        s.statusname,
        m.name,
        m.tenantcode,
        m.Raised_date,
        m.userid,
        m.module,
        
        m.assign_to,
        m.resolve_date,
        m.taken_time,
        CASE 
            WHEN m.taken_time IS NULL THEN NULL
            WHEN m.taken_time >= 1440 THEN -- 24*60 minutes
                CAST(m.taken_time / 1440 AS VARCHAR) + 'd ' +
                CAST((m.taken_time % 1440) / 60 AS VARCHAR) + 'h ' +
                CAST(m.taken_time % 60 AS VARCHAR) + 'm'
            ELSE
                CAST(m.taken_time / 60 AS VARCHAR) + 'h ' +
                CAST(m.taken_time % 60 AS VARCHAR) + 'm'
        END AS taken_time_formatted
    FROM issues m
    JOIN sttabble s ON m.statusid = s.statusid
    WHERE m.userid = @userid;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_Getisseusebyeuid]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[sp_Getisseusebyeuid]
    @userid INT
AS
BEGIN
    SELECT
        m.issues_id ,
        m.descriptions,
        ISNULL(STUFF((
            SELECT ',' + mi.imagepath
            FROM img_table mi
            WHERE mi.issuesTableid = m.issues_id 
            FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'), 1, 1, ''), '') AS imagepaths,
        s.statusname,
        m.name,
        m.tenantcode,
        m.Raised_date,
        m.userid,
        m.module,
        
        m.assign_to,
        m.resolve_date,
        m.taken_time,
        CASE 
            WHEN m.taken_time IS NULL THEN NULL
            WHEN m.taken_time >= 1440 THEN -- 24*60 minutes
                CAST(m.taken_time / 1440 AS VARCHAR) + 'd ' +
                CAST((m.taken_time % 1440) / 60 AS VARCHAR) + 'h ' +
                CAST(m.taken_time % 60 AS VARCHAR) + 'm'
            ELSE
                CAST(m.taken_time / 60 AS VARCHAR) + 'h ' +
                CAST(m.taken_time % 60 AS VARCHAR) + 'm'
        END AS taken_time_formatted
    FROM issues m
    JOIN sttabble s ON m.statusid = s.statusid
    WHERE m.userid = @userid;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetIssue]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[sp_GetIssue]
    @userid int
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        m.Raised_date,
		s.statusname,
        m.name
    FROM issues m
    JOIN sttabble s ON m.statusid = s.statusid  -- Replace with your actual table name
    WHERE 
        userid = @userid
    ORDER BY 
        Raised_date ASC;  -- Or DESC depending on your need
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetIssue_Types]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetIssue_Types]
AS
BEGIN
    SELECT issuesid , issue_type FROM issuetype;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetIssueById]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[sp_GetIssueById]
    @IssueId VARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        i.issue_id,
        i.users,
        i.raised_date,
        s.statusname,
        i.assign_to,
        i.description,
        i.module,
        ISNULL(STUFF((
            SELECT ',' + img.image_path
            FROM IssueImages img
            WHERE img.issue_id = i.issue_id
            FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'), 1, 1, ''), '') AS imagepaths
    FROM Issues i
    JOIN status s ON i.statusid = s.statusid
    WHERE i.issue_id = @IssueId;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_Getissues]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[sp_Getissues]
		@SearchTerm NVARCHAR(100) = NULL,
		@PageNumber INT = 1,
		@PageSize INT = 10
	AS
	BEGIN
		SET NOCOUNT ON;

		-- Calculate the starting row number for pagination
		DECLARE @StartRow INT = (@PageNumber - 1) * @PageSize + 1;
		DECLARE @EndRow INT = @PageNumber * @PageSize;

		;WITH MatablesCTE AS (
			SELECT
				m.issues_id ,
				m.descriptions,
				ISNULL(STUFF((
					SELECT ',' + mi.imagepath
					FROM img_table mi
					WHERE mi.issuesTableid = m.issues_id 
					FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'), 1, 1, ''), '') AS imagepaths,
				s.statusname,
				m.name,
				m.tenantcode,
				m.Raised_date,
				m.userid,
				ROW_NUMBER() OVER (ORDER BY m.issues_id ) AS RowNum
			FROM issues m
			JOIN sttabble s ON m.statusid = s.statusid
			WHERE (@SearchTerm IS NULL OR @SearchTerm = '' 
				   OR m.name LIKE '%' + @SearchTerm + '%' 
				   OR m.descriptions LIKE '%' + @SearchTerm + '%'
				   OR s.statusname LIKE '%' + @SearchTerm + '%')
		)

		SELECT
		m.issues_id ,
		m.descriptions,
		ISNULL(STUFF((
			SELECT ',' + mi.imagepath
			FROM img_table mi
			WHERE mi.issuesTableid = m.issues_id 
			FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'), 1, 1, ''), '') AS imagepaths,
		s.statusname,
		m.name,
		m.tenantcode,
		m.Raised_date,
		m.userid,
		m.module,
	
		m.assign_to,
		m.resolve_date,
		m.taken_time,              -- raw minutes
    
		ROW_NUMBER() OVER (ORDER BY m.issues_id ) AS RowNum
	FROM issues m
	JOIN sttabble s ON m.statusid = s.statusid
	WHERE (@SearchTerm IS NULL OR @SearchTerm = '' 
		   OR m.name LIKE '%' + @SearchTerm + '%' 
		   OR m.descriptions LIKE '%' + @SearchTerm + '%'
		   OR s.statusname LIKE '%' + @SearchTerm + '%')

	END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetIssueTypeByid]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetIssueTypeByid]
    @issuesid INT
AS
BEGIN
    SELECT issuesid , issue_type FROM issuetype WHERE issuesid = @issuesid ;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetStatusById]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetStatusById]
    @statusid UNIQUEIDENTIFIER
AS
BEGIN
    SELECT * FROM sttabble
    WHERE statusid = @statusid;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_GetStatusLogByissuesid]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[sp_GetStatusLogByissuesid]
    @issuesTableid UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        sl.issues_id ,
        sl.statusid,
        s.statusname,
        sl.issuesTableid,
        m.name AS matable_name,
        sl.logtime
    FROM statuslog sl
    INNER JOIN sttabble s ON sl.statusid = s.statusid
    INNER JOIN issues m ON sl.issuesTableid = m.issues_id 
    WHERE sl.issuesTableid = @issuesTableid
    ORDER BY sl.logtime DESC;  -- Optional: latest log on top
END
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertAssign_to]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[sp_InsertAssign_to]
    @devname NVARCHAR(100)
AS
BEGIN
    INSERT INTO assign_to (devname)
    VALUES (@devname);
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_Insertisssues]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[sp_Insertisssues]
    @Description VARCHAR(255),
    @ImagePaths NVARCHAR(MAX), -- comma-separated image paths
    @Name NVARCHAR(100),
    @TenantCode NVARCHAR(50),
    @UserId INT,
    @Module NVARCHAR(100),
   
    @AssignTo NVARCHAR(500)=NULL,
    @ResolveDate DATETIME = NULL
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @StatusId UNIQUEIDENTIFIER;

    -- Get the default statusid (for 'Pending')
    SELECT TOP 1 @StatusId = statusid FROM sttabble WHERE statusname = 'Pending';

    IF @StatusId IS NULL
    BEGIN
        -- Insert default status if not exists
        SET @StatusId = NEWID();
        INSERT INTO sttabble (statusid, statusname)
        VALUES (@StatusId, 'Pending');
    END

    DECLARE @newissues_id UNIQUEIDENTIFIER = NEWID();

    -- Insert into issues
    INSERT INTO issues (
        issues_id, descriptions, statusid, name, tenantcode, userid,
        module,  assign_to, resolve_date
    )
    VALUES (
        @newissues_id, @Description, @StatusId, @Name, @TenantCode, @UserId,
        @Module, @AssignTo, @ResolveDate
    );

    -- Insert image paths into img_table
    IF (@ImagePaths IS NOT NULL AND @ImagePaths <> '')
    BEGIN
        DECLARE @ImagePath NVARCHAR(255)
        DECLARE @Pos INT
        WHILE LEN(@ImagePaths) > 0
        BEGIN
            SET @Pos = CHARINDEX(',', @ImagePaths)
            IF @Pos = 0
            BEGIN
                SET @ImagePath = @ImagePaths
                SET @ImagePaths = ''
            END
            ELSE
            BEGIN
                SET @ImagePath = LEFT(@ImagePaths, @Pos - 1)
                SET @ImagePaths = RIGHT(@ImagePaths, LEN(@ImagePaths) - @Pos)
            END

            INSERT INTO img_table (issuesTableid, imagepath)
            VALUES (@newissues_id, @ImagePath)
        END
    END

    -- Return the new ID
    SELECT @newissues_id AS issuesTableid
END
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertIssue_Type]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_InsertIssue_Type]
    @issue_type NVARCHAR(100)
AS
BEGIN
    INSERT INTO issuetype (issue_type)
    VALUES (@issue_type);
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertStatus]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_InsertStatus]
    @statusname VARCHAR(50)
AS
BEGIN
    INSERT INTO sttabble (statusname)
    VALUES (@statusname);
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_InsertStatusLogs]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[sp_InsertStatusLogs]
    @StatusName VARCHAR(50),
    @issuesTableid UNIQUEIDENTIFIER
AS
BEGIN
    DECLARE @StatusId UNIQUEIDENTIFIER;

    -- Get the status ID based on the provided status name
    SELECT @StatusId = statusid
    FROM sttabble
    WHERE statusname = @StatusName;

    IF @StatusId IS NULL
    BEGIN
        -- If status is not found, insert it
        INSERT INTO sttabble (statusname)
        VALUES (@StatusName);

        -- Get the newly inserted status issues_id 
        SELECT @StatusId = statusid
        FROM sttabble
        WHERE statusname = @StatusName;
    END

    -- Insert into the statuslog table
    INSERT INTO statuslog (statusid, issuesTableid)
    VALUES (@StatusId, @issuesTableid);
END
GO
/****** Object:  StoredProcedure [dbo].[sp_Searchissues]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[sp_Searchissues]
    @SearchTerm NVARCHAR(100),
    @PageNumber INT = 1,
    @PageSize INT = 10
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Offset INT = (@PageNumber - 1) * @PageSize;

    -- 🔹 1. Return total count of matching records
    SELECT COUNT(*) AS TotalCount
    FROM issues m
    JOIN sttabble s ON m.statusid = s.statusid
    WHERE 
        m.name LIKE '%' + @SearchTerm + '%'
        OR m.descriptions LIKE '%' + @SearchTerm + '%'
        OR m.tenantcode LIKE '%' + @SearchTerm + '%';

    -- 🔹 2. Return paginated results
    SELECT 
        m.issues_id ,
        m.descriptions,
        ISNULL(STUFF(( 
            SELECT ',' + mi.imagepath
            FROM img_table mi
            WHERE mi.issuesTableid = m.issues_id 
            FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)'), 1, 1, ''), '') AS imagepaths,
        s.statusname,
        m.name,
        m.tenantcode,
        m.Raised_date,
        m.userid
    FROM issues m
    JOIN sttabble s ON m.statusid = s.statusid
    WHERE 
        m.name LIKE '%' + @SearchTerm + '%'
        OR m.descriptions LIKE '%' + @SearchTerm + '%'
        OR m.tenantcode LIKE '%' + @SearchTerm + '%'
    ORDER BY m.Raised_date DESC
    OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateAssign_to]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[sp_UpdateAssign_to]
    @issues_id INT,
    @devname NVARCHAR(100)
AS
BEGIN
    UPDATE assign_to
    SET devname = @devname
    WHERE issues_id = @issues_id ;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateIssue_Type]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_UpdateIssue_Type]
    @issuesid INT,
    @issue_type NVARCHAR(100)
AS
BEGIN
    UPDATE issuetype
    SET issue_type = @issue_type
    WHERE issuesid = @issuesid ;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_Updateissues]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[sp_Updateissues]
		
		@userid INT,
		@ImagePaths varchar(255),
		@AssignTo NVARCHAR(500) = NULL,
		@StatusName NVARCHAR(50)
	AS
	BEGIN
		SET NOCOUNT ON;

		BEGIN TRY
			DECLARE @StatusId UNIQUEIDENTIFIER;

			-- Get StatusId based on StatusName passed (case-insensitive)
			SELECT TOP 1 @StatusId = statusid 
			FROM sttabble 
			WHERE LOWER(statusname) = LOWER(@StatusName);

			IF @StatusId IS NULL
			BEGIN
				THROW 50001, 'Invalid StatusName provided.', 1;
			END

			-- Update issues record by userid (only one record per userid assumed)
			UPDATE issues
	SET 
		
		statusid = @StatusId,
		
		assign_to = @AssignTo,
		resolve_date = CASE 
						WHEN LOWER(@StatusName) = 'solved' AND (resolve_date IS NULL OR resolve_date = '1900-01-01') 
							THEN GETDATE()
						ELSE resolve_date
					  END,
		
		taken_time = DATEDIFF(MINUTE, Raised_date, GETDATE())
	WHERE userid = @userid;



			-- Insert new images (if any)
			DECLARE @xml XML = TRY_CAST('<i>' + REPLACE(@ImagePaths, ',', '</i><i>') + '</i>' AS XML);

			
			-- Return the updated issuesTableid
			SELECT @userid AS issuesTableid;
		END TRY
		BEGIN CATCH
			DECLARE 
				@ErrorMessage NVARCHAR(4000), 
				@ErrorSeverity INT, 
				@ErrorState INT;
			SELECT 
				@ErrorMessage = ERROR_MESSAGE(), 
				@ErrorSeverity = ERROR_SEVERITY(), 
				@ErrorState = ERROR_STATE();
			THROW @ErrorSeverity, @ErrorMessage, @ErrorState;
		END CATCH
	END;
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateissuestableByUserId]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[sp_UpdateissuestableByUserId]
    @userid INT,
    @statusname NVARCHAR(100),   -- Accept status name instead of ID
    @ImagePaths VARCHAR(255),
    @assignto NVARCHAR(500)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @StatusId UNIQUEIDENTIFIER;
    DECLARE @SolveStatusId UNIQUEIDENTIFIER;

    -- Get the statusid from sttabble using the provided status name
    SELECT TOP 1 @StatusId = statusid
    FROM sttabble
    WHERE LOWER(statusname) = LOWER(@statusname);

    -- Get the statusid for 'solve'
    SELECT TOP 1 @SolveStatusId = statusid
    FROM sttabble
    WHERE LOWER(statusname) = LOWER(@statusname);

    -- Update the issues table
    UPDATE issues
    SET 
        statusid = @StatusId,
        assign_to = COALESCE(@assignto, assign_to),
        resolve_date = CASE 
                          WHEN @StatusId = @SolveStatusId THEN GETDATE()
                          ELSE resolve_date
                       END,
        taken_time = CASE 
                         WHEN @StatusId = @SolveStatusId THEN DATEDIFF(MINUTE, '19700101', GETDATE())
                         ELSE taken_time
                     END
    WHERE userid = @userid;
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateStatus]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_UpdateStatus]
    @statusid UNIQUEIDENTIFIER,
    @statusname VARCHAR(50)
AS
BEGIN
    UPDATE sttabble
    SET statusname = @statusname
    WHERE statusid = @statusid;
END;
GO
/****** Object:  StoredProcedure [dbo].[UpdateUser]    Script Date: 23-06-2025 17:42:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[UpdateUser]
    @UserId INT,
    @Name NVARCHAR(100),
    @Email NVARCHAR(100),
    @Mobile_number NVARCHAR(20),
    @Addresh NVARCHAR(200)
AS
BEGIN
    UPDATE users
    SET
        Name = @Name,
        Email = @Email,
        Mobile_number = @Mobile_number,
        Addresh = @Addresh
    WHERE issuesid = @UserId
END
GO
USE [master]
GO
ALTER DATABASE [isssues] SET  READ_WRITE 
GO
