# SERN
sql server + express + reactjs + nodejs

## CRUD example

### FRONT END   = reactjs

<img width="1469" alt="reactjs" src="https://github.com/AJEETX/SERN/blob/master/fe.png">

### BACK END    = nodejs
<img width="1469" alt="nodejs" src="https://github.com/AJEETX/SERN/blob/master/be.png">


#### ms sql server

    > create sql server database 
```
    create database nodeDB
    GO

    use [nodeDB]
    GO
    SET ANSI_NULLS ON
    GO
    SET QUOTED_IDENTIFIER ON
    GO
    CREATE TABLE [dbo].[tblNode](
	[ID] [nvarchar](50) NULL,
	[Name] [nvarchar](50) NULL,
	[Detail] [nvarchar](50) NULL
    ) ON [PRIMARY]
    GO
```    