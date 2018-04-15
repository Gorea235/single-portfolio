-- init tables

CREATE TABLE `Config` (
    `Key` VARCHAR(50) NOT NULL,
    `Value` TEXT,
    PRIMARY KEY (`Key`)
);

CREATE TABLE `Galleries` (
    `ID` int NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(255) NOT NULL,
    `Desc` TEXT,
    `DateAdded` DATETIME,
    `DateUpdated` DATETIME,
    PRIMARY KEY (`ID`)
);

CREATE TABLE `ImageKind` (
    `ID` int NOT NULL,
    `Name` VARCHAR(255) NOT NULL,
    `Desc` TEXT,
    PRIMARY KEY (`ID`)
);

CREATE TABLE `GalleryImages` (
    `ID` int NOT NULL AUTO_INCREMENT,
    `GalleryID` int NOT NULL,
    `ImageKindID` int NOT NULL,
    `Desc` TEXT,
    `DateTaken` DATETIME,
    `ImageData` TEXT,
    PRIMARY KEY (`ID`),
    INDEX (`GalleryID`),
    INDEX (`ImageKindID`),
    FOREIGN KEY (`GalleryID`)
        REFERENCES `Galleries`(`ID`)
        ON DELETE CASCADE,
    FOREIGN KEY (`ImageKindID`)
        REFERENCES `ImageKind`(`ID`)
);

CREATE TABLE `Categories` (
    `ID` int NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(255) NOT NULL,
    `Desc` TEXT,
    PRIMARY KEY (`ID`)
);

CREATE TABLE `GalleryImageCategories` (
    `GalleryImageID` int NOT NULL,
    `CategoryID` int NOT NULL,
    PRIMARY KEY (`GalleryImageID`, `CategoryID`),
    FOREIGN KEY (`GalleryImageID`)
        REFERENCES `GalleryImages`(`ID`)
        ON DELETE CASCADE,
    FOREIGN KEY (`CategoryID`)
        REFERENCES `Categories`(`ID`)
        ON DELETE CASCADE
);

-- init default data

INSERT INTO `ImageKind` (`ID`, `Name`, `Desc`)
VALUES (0, 'Direct URL', 'Direct image link');
INSERT INTO `ImageKind` (`ID`, `Name`, `Desc`)
VALUES (1, 'Imgur ID', 'Direct Imgur ID');

INSERT INTO `Config` (`Key`, `Value`)
VALUES ('portfolio_title', '');
INSERT INTO `Config` (`Key`, `Value`)
VALUES ('contact_info', '');
