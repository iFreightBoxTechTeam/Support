﻿------------------------------------------------status table---------------------------------------------------------
create table sttabble(statusid UNIQUEIDENTIFIER primary key Default newid(),
						statusname varchar(50));
drop table users;
select * from sttabble;
DELETE FROM statuslog;
SELECT * FROM statuslog WHERE statusid = '00000000-0000-0000-0000-000000000000';
	
drop procedure sp_GetMatableByid;
EXEC sp_SearchMatables @SearchTerm = 'zsdC', @PageNumber = 1, @PageSize = 10;
ALTER TABLE issues DROP COLUMN taken_time;
ALTER TABLE issues ADD taken_time INT NULL;
SELECT COLUMN_NAME, DATA_TYPE 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'issues' AND COLUMN_NAME = 'taken_time';


---------------------------------------------------------------------------users -------------------------------------------------------------
CREATE TABLE users (
    issuesid INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

----------------------------------------------------------------user in get-----------------------------------------------------------------
CREATE or alter PROCEDURE GetUser
    
AS
BEGIN
    SELECT issuesid , name, email
    FROM users
    
END;


CREATE PROCEDURE GetUserByName
    @name VARCHAR(100)
AS
BEGIN
    SELECT issuesid , name, email
    FROM users
    WHERE name = @name;
END;
------------------------------------------------------------------users insert--------------------------------------------------------------
SELECT * FROM users;

CREATE or alter PROCEDURE InsertUser
    @name VARCHAR(100),
    @email VARCHAR(255),
    @password_hash VARCHAR(255)
AS
BEGIN

    -- Check if the email already exists
    IF EXISTS (SELECT 1 FROM users WHERE email = @email)
    BEGIN
        RAISERROR('Email already exists.', 16, 1);
        RETURN;
    END

    -- Insert the new user
    INSERT INTO users (name, email, password_hash)
    VALUES (@name, @email, @password_hash);
END;

-----------------------------------------mastertable----------------------------------------------------------------------
create table issues(
				issues_id UNIQUEIDENTIFIER primary key Default newid(),
				descriptions varchar(255),
				imagepath varchar(255),
				statusid UNIQUEIDENTIFIER foreign key references sttabble(statusid),
				name NVARCHAR(100) NOT NULL,
				tenantcode NVARCHAR(50) NOT NULL,
			    Raised_date DATETIME NOT NULL DEFAULT GETDATE(),
				userid INT  NOT NULL
				);
				ALTER TABLE issues
ALTER COLUMN assign_to VARCHAR(500);-- or NVARCHAR(500) if needed
ALTER TABLE issues
drop taken_time_formatted AS 
    CASE 
        WHEN taken_time IS NULL THEN NULL
        WHEN taken_time >= 1440 THEN
            CAST(taken_time / 1440 AS VARCHAR) + 'd ' +
            CAST((taken_time % 1440) / 60 AS VARCHAR) + 'h ' +
            CAST(taken_time % 60 AS VARCHAR) + 'm'
        ELSE
            CAST(taken_time / 60 AS VARCHAR) + 'h ' +
            CAST(taken_time % 60 AS VARCHAR) + 'm'
    END PERSISTED;
	ALTER TABLE issues
ADD taken_time FLOAT NULL,
	assign_to varchar(255);




ALTER TABLE issues
ADD module NVARCHAR(100),
   resolve_date DATETIME NULL,
    assign_to Nvarchar(500), -- or NVARCHAR if using names/emails instead
    
    taken_time AS DATEDIFF(MINUTE, Raised_date, resolve_date); -- auto-calculated

ALTER TABLE issues
ADD taken_time INT NULL;

SELECT COLUMN_NAME 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'issues' 
  AND COLUMN_NAME IN ('taken_time', 'resolve_date', 'assign_to');


----------------------------------------------------------------post-----------------------------------------------------------------
CREATE OR ALTER PROCEDURE sp_Insertisssues
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
---------------------------------------------------------------get all----------------------------------------------------------
CREATE OR ALTER PROCEDURE sp_GetAll
AS
BEGIN
    SELECT 
        m.issues_id ,
        m.descriptions,
        -- add this column here
        m.imagepath,
        -- other columns
        m.taken_time,
       CASE 
    WHEN m.taken_time IS NULL THEN NULL
    WHEN m.taken_time >= 1440 THEN -- 1440 minutes = 24 hours
        CAST(m.taken_time / 1440 AS VARCHAR) + 'd ' +
        CAST((m.taken_time % 1440) / 60 AS VARCHAR) + 'h ' +
        CAST(m.taken_time % 60 AS VARCHAR) + 'm'
    ELSE
        CAST(m.taken_time / 60 AS VARCHAR) + 'h ' +
        CAST(m.taken_time % 60 AS VARCHAR) + 'm'
END AS taken_time_formatted,
        s.statusname,
        m.name,
        m.tenantcode,
        m.Raised_date,
        m.userid,
        m.module,
        m.assign_to,
        m.resolve_date
    FROM issues m
    JOIN sttabble s ON m.statusid = s.statusid
END


ALTER TABLE issues
DROP COLUMN IF EXISTS taken_time;
---------------------------------------------------------------get all ,search, pagination ----------------------------------------------------------
	CREATE OR ALTER PROCEDURE sp_Getissues
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

	EXEC sp_Getissues @SearchTerm = 'shreya', @PageNumber = 1, @PageSize = 10;


---------------------------------------------------------------------------get be issues_id ---------------------------------------------------------------------
CREATE OR ALTER PROCEDURE GetById
    @Id UNIQUEIDENTIFIER
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        m.issues_id ,
        m.descriptions,
        m.imagepath,
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
    WHERE m.issues_id = @Id;
END;


---------------------------------------------------------------------get by userid------------------------------------------------------------------------
CREATE OR ALTER PROCEDURE sp_Getbyuserid
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

SELECT COLUMN_NAME, DATA_TYPE, COLUMNPROPERTY(object_id(TABLE_SCHEMA + '.' + TABLE_NAME), COLUMN_NAME, 'IsComputed') AS IsComputed
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'issues' AND COLUMN_NAME = 'taken_time';
---------------------------------------------------------------------------------------------put----------------------------------------------------------------

CREATE OR ALTER PROCEDURE sp_Updateissues
    @issuesTableid UNIQUEIDENTIFIER,
    @Description NVARCHAR(MAX),
    @ImagePaths NVARCHAR(MAX),
   
    @userid int,
    
    @AssignTo NVARCHAR(255),
    @StatusName NVARCHAR(100)

AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        DECLARE @StatusId UNIQUEIDENTIFIER;

        -- Get StatusId based on StatusName passed
        SELECT TOP 1 @StatusId = statusid 
        FROM sttabble 
        WHERE statusname = @StatusName;

        -- Update issues
        UPDATE issues
SET 
    descriptions = @Description,
    statusid = @StatusId,
    assign_to = @AssignTo,
    resolve_date = CASE 
                    WHEN @StatusName = 'Solved' AND (resolve_date IS NULL OR resolve_date = '1900-01-01') THEN GETDATE()
                    ELSE resolve_date
                  END
WHERE userid = @userid;


        -- Update images: delete old and insert new
       

        -- Return updated issuesTableid
        SELECT @issuesTableid AS issuesTableid;
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
END


	CREATE OR ALTER PROCEDURE sp_Updateissues
		
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


EXEC sp_helptext 'sp_UpdateissuestableByUserId'
CREATE OR ALTER PROCEDURE sp_UpdateissuestableByUserId
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


EXEC sp_UpdateissuestableByUserId 
    @userid = 892,  -- Replace with a real user ID
    @statusname = 'InProgress',  -- Replace with an actual UNIQUEIDENTIFIER from sttabble
    @ImagePaths = 'image1.jpg,image2.jpg',  -- Replace with real image paths if needed
    @assignto = 'John Doe';  -- Replace with actual assignee name

---------------------------------------------------------------------delete-----------------------------------------------------
CREATE OR ALTER PROCEDURE sp_Deleteissues
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

-------------------------------------------------------status log---------------------------------------------------------------------
CREATE TABLE statuslog (
    issues_id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    statusid UNIQUEIDENTIFIER NOT NULL,
    issuesTableid UNIQUEIDENTIFIER NOT NULL,
    logtime DATETIME NOT NULL DEFAULT GETDATE(),

    FOREIGN KEY (statusid) REFERENCES sttabble(statusid),
    FOREIGN KEY (issuesTableid) REFERENCES issues(issues_id )  --  line causes the error
);

-----------------------------------
CREATE OR ALTER PROCEDURE sp_InsertStatusLogs
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
------------------------------------------------------------------------
CREATE or alter PROCEDURE sp_GetAllStatusLog
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
-------------------------------------------------------
CREATE OR ALTER PROCEDURE sp_GetStatusLogByissuesid
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


ALTER TABLE statuslog
DROP CONSTRAINT FK__statuslog__matab__65570293;

ALTER TABLE statuslog
ADD CONSTRAINT FK__statuslog__matableid
FOREIGN KEY (issuesTableid) REFERENCES issues(issues_id ) ON DELETE CASCADE;

select * from img_table;

---------------------------------------------------------------------------------------------------------
CREATE TABLE img_table (
    issues_id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    issuesTableid UNIQUEIDENTIFIER NOT NULL,
    imagepath VARCHAR(255) NOT NULL,
    FOREIGN KEY (issuesTableid) REFERENCES issues(issues_id ) ON DELETE CASCADE
);
select * from
-----------------------------------------------------------
ALTER TABLE statuslog
ADD CONSTRAINT FK__statuslog__matableid
FOREIGN KEY (issuesTableid) REFERENCES issues(issues_id ) ON DELETE CASCADE;
SELECT 
    fk.name AS FK_constraint_name, 
    tp.name AS parent_table, 
    ref.name AS referenced_table
FROM sys.foreign_keys AS fk
INNER JOIN sys.tables AS tp ON fk.parent_object_id = tp.object_id
INNER JOIN sys.tables AS ref ON fk.referenced_object_id = ref.object_id
WHERE tp.name = 'statuslog';
ALTER TABLE statuslog
ADD CONSTRAINT FK__statuslog__matableid
FOREIGN KEY (issuesTableid) REFERENCES issues(issues_id ) ON DELETE CASCADE;
DROP TABLE IF EXISTS statuslog;



CREATE TABLE statuslogs (
    issues_id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    statusid UNIQUEIDENTIFIER NOT NULL,
    issuesTableid UNIQUEIDENTIFIER NOT NULL,
    logtime DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (statusid) REFERENCES sttabble(statusid),
    FOREIGN KEY (issuesTableid) REFERENCES issues(issues_id ) ON DELETE CASCADE
);

CREATE OR ALTER PROCEDURE  export
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


CREATE OR ALTER PROCEDURE sp_Searchissues
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

-------------------------------------------------------------------assign dev-------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE assign_to (
    issues_isINT IDENTITY(1,1) PRIMARY KEY,
    devname NVARCHAR(100) NOT NULL
);
--------------------------------------------insert in assigndev -----------------------------------------------
CREATE or alter PROCEDURE sp_InsertAssign_to
    @devname NVARCHAR(100)
AS
BEGIN
    INSERT INTO assign_to (devname)
    VALUES (@devname);
END;
select * from assign_to
---------------------------------------------------------delete -------------------------------------------------
CREATE or alter  PROCEDURE sp_DeleteAssign_to
    @issues_id INT
AS
BEGIN
    DELETE FROM assign_to
    WHERE issues_id = @issues_id ;
END;

-----------------------------------------------------update or edit----------------------------------------------
CREATE or alter PROCEDURE sp_UpdateAssign_to
    @issues_id INT,
    @devname NVARCHAR(100)
AS
BEGIN
    UPDATE assign_to
    SET devname = @devname
    WHERE issues_id = @issues_id ;
END;

------------------------------------------------------fetch-----------------------------------------------------
CREATE or alter PROCEDURE sp_GetAssign_to
AS
BEGIN
    SELECT issues_id , devname FROM assign_to;
END;


ALTER TABLE issues DROP COLUMN taken_time;

ALTER TABLE issues ADD taken_time INT NULL;


-----------------------------------------------------------------------issues type----------------------------------------------------------------------------------
CREATE TABLE issuetype (
    issuesid INT IDENTITY(1,1) PRIMARY KEY,
    issue_type NVARCHAR(100) NOT NULL
);

----------------------------------------------------------------------insert issue type ----------------------------------------------------------------------------
CREATE PROCEDURE sp_InsertIssue_Type
    @issue_type NVARCHAR(100)
AS
BEGIN
    INSERT INTO issuetype (issue_type)
    VALUES (@issue_type);
END;

----------------------------------------------------------------------update issue type ----------------------------------------------------------------------------
CREATE PROCEDURE sp_UpdateIssue_Type
    @issuesid INT,
    @issue_type NVARCHAR(100)
AS
BEGIN
    UPDATE issuetype
    SET issue_type = @issue_type
    WHERE issuesid = @issuesid ;
END;

----------------------------------------------------------------------delete issue type ----------------------------------------------------------------------------
CREATE PROCEDURE sp_DeleteIssue_Type
    @issuesid INT
AS
BEGIN
    DELETE FROM issuetype
    WHERE issuesid = @issuesid ;
END;

----------------------------------------------------------------------fetch issue type ----------------------------------------------------------------------------
CREATE PROCEDURE sp_GetIssue_Types
AS
BEGIN
    SELECT issuesid , issue_type FROM issuetype;
END;

----------------------------------------------------------------------fetch by issues_isissue type ----------------------------------------------------------------------------
CREATE PROCEDURE sp_GetIssueTypeByid
    @issuesid INT
AS
BEGIN
    SELECT issuesid , issue_type FROM issuetype WHERE issuesid = @issuesid ;
END;


CREATE or alter PROCEDURE sp_GetIssue
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
EXEC sp_helptext 'sp_GetIssue';
EXEC sp_GetIssue @userid = 5;
----------------------------------------------------------------sps for status
CREATE PROCEDURE sp_InsertStatus
    @statusname VARCHAR(50)
AS
BEGIN
    INSERT INTO sttabble (statusname)
    VALUES (@statusname);
END;


CREATE PROCEDURE sp_GetAllStatuses
AS
BEGIN
    SELECT * FROM sttabble;
END;
CREATE PROCEDURE sp_GetStatusById
    @statusid UNIQUEIDENTIFIER
AS
BEGIN
    SELECT * FROM sttabble
    WHERE statusid = @statusid;
END;
CREATE PROCEDURE sp_UpdateStatus
    @statusid UNIQUEIDENTIFIER,
    @statusname VARCHAR(50)
AS
BEGIN
    UPDATE sttabble
    SET statusname = @statusname
    WHERE statusid = @statusid;
END;
CREATE PROCEDURE sp_DeleteStatus
    @statusid UNIQUEIDENTIFIER
AS
BEGIN
    DELETE FROM sttabble
    WHERE statusid = @statusid;
END;
