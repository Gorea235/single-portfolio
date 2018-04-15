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

-- init debug data

INSERT INTO `Categories` (`Name`, `Desc`)
VALUES ('category 1', 'test category 1');
INSERT INTO `Categories` (`Name`, `Desc`)
VALUES ('category 2', 'test category 2');
INSERT INTO `Categories` (`Name`, `Desc`)
VALUES ('category 3', 'test category 3');
INSERT INTO `Categories` (`Name`, `Desc`)
VALUES ('category 4', 'test category 4');
INSERT INTO `Categories` (`Name`, `Desc`)
VALUES ('category 5', 'test category 5');

INSERT INTO `Galleries` (`Name`, `Desc`, `DateAdded`, `DateUpdated`)
VALUES ('gallery 1', 'testing gallery 1', '2018-04-04T20:12:00', '2018-04-04T20:12:00');
INSERT INTO `Galleries` (`Name`, `Desc`, `DateAdded`, `DateUpdated`)
VALUES ('gallery 2', 'testing gallery 2', '2018-04-04T20:12:00', '2018-04-04T20:12:00');
INSERT INTO `Galleries` (`Name`, `Desc`, `DateAdded`, `DateUpdated`)
VALUES ('gallery 3', 'testing gallery 3', '2018-04-04T20:12:00', '2018-04-04T20:12:00');
INSERT INTO `Galleries` (`Name`, `Desc`, `DateAdded`, `DateUpdated`)
VALUES ('gallery 4', 'testing gallery 4', '2018-04-04T20:12:00', '2018-04-04T20:12:00');
INSERT INTO `Galleries` (`Name`, `Desc`, `DateAdded`, `DateUpdated`)
VALUES ('gallery 5', 'testing gallery 5', '2018-04-04T20:12:00', '2018-04-04T20:12:00');

INSERT INTO `GalleryImages` (`GalleryID`, `ImageKindID`, `Desc`, `DateTaken`, `ImageData`)
VALUES (1, 0, 'image 1', '2018-04-04T20:12:00', 'https://picsum.photos/300?random?id=1');
INSERT INTO `GalleryImages` (`GalleryID`, `ImageKindID`, `Desc`, `DateTaken`, `ImageData`)
VALUES (1, 0, 'image 2', '2018-04-04T20:12:00', 'https://picsum.photos/300?random?id=2');
INSERT INTO `GalleryImages` (`GalleryID`, `ImageKindID`, `Desc`, `DateTaken`, `ImageData`)
VALUES (1, 0, 'image 3', '2018-04-04T20:12:00', 'https://picsum.photos/300?random?id=3');
INSERT INTO `GalleryImages` (`GalleryID`, `ImageKindID`, `Desc`, `DateTaken`, `ImageData`)
VALUES (2, 0, 'image 4', '2018-04-04T20:12:00', 'https://picsum.photos/300?random?id=4');
INSERT INTO `GalleryImages` (`GalleryID`, `ImageKindID`, `Desc`, `DateTaken`, `ImageData`)
VALUES (2, 0, 'image 5', '2018-04-04T20:12:00', 'https://picsum.photos/300?random?id=5');
INSERT INTO `GalleryImages` (`GalleryID`, `ImageKindID`, `Desc`, `DateTaken`, `ImageData`)
VALUES (3, 0, 'image 6', '2018-04-04T20:12:00', 'https://picsum.photos/300?random?id=6');
INSERT INTO `GalleryImages` (`GalleryID`, `ImageKindID`, `Desc`, `DateTaken`, `ImageData`)
VALUES (3, 0, 'image 7', '2018-04-04T20:12:00', 'https://picsum.photos/300?random?id=7');
INSERT INTO `GalleryImages` (`GalleryID`, `ImageKindID`, `Desc`, `DateTaken`, `ImageData`)
VALUES (4, 0, 'image 8', '2018-04-04T20:12:00', 'https://picsum.photos/300?random?id=8');
INSERT INTO `GalleryImages` (`GalleryID`, `ImageKindID`, `Desc`, `DateTaken`, `ImageData`)
VALUES (4, 0, 'image 9', '2018-04-04T20:12:00', 'https://picsum.photos/300?random?id=9');
INSERT INTO `GalleryImages` (`GalleryID`, `ImageKindID`, `Desc`, `DateTaken`, `ImageData`)
VALUES (5, 0, 'image 10', '2018-04-04T20:12:00', 'https://picsum.photos/300?random?id=10');
INSERT INTO `GalleryImages` (`GalleryID`, `ImageKindID`, `Desc`, `DateTaken`, `ImageData`)
VALUES (5, 0, 'image 11', '2018-04-04T20:12:00', 'https://picsum.photos/300?random?id=11');
INSERT INTO `GalleryImages` (`GalleryID`, `ImageKindID`, `Desc`, `DateTaken`, `ImageData`)
VALUES (5, 0, 'image 12', '2018-04-04T20:12:00', 'https://picsum.photos/300?random?id=12');

INSERT INTO `GalleryImageCategories` (`GalleryImageID`, `CategoryID`)
VALUES (1, 1);
INSERT INTO `GalleryImageCategories` (`GalleryImageID`, `CategoryID`)
VALUES (1, 2);
INSERT INTO `GalleryImageCategories` (`GalleryImageID`, `CategoryID`)
VALUES (1, 3);
INSERT INTO `GalleryImageCategories` (`GalleryImageID`, `CategoryID`)
VALUES (2, 1);
INSERT INTO `GalleryImageCategories` (`GalleryImageID`, `CategoryID`)
VALUES (2, 2);
INSERT INTO `GalleryImageCategories` (`GalleryImageID`, `CategoryID`)
VALUES (2, 3);
INSERT INTO `GalleryImageCategories` (`GalleryImageID`, `CategoryID`)
VALUES (3, 3);
INSERT INTO `GalleryImageCategories` (`GalleryImageID`, `CategoryID`)
VALUES (3, 4);
INSERT INTO `GalleryImageCategories` (`GalleryImageID`, `CategoryID`)
VALUES (4, 2);
INSERT INTO `GalleryImageCategories` (`GalleryImageID`, `CategoryID`)
VALUES (4, 3);
INSERT INTO `GalleryImageCategories` (`GalleryImageID`, `CategoryID`)
VALUES (4, 5);
INSERT INTO `GalleryImageCategories` (`GalleryImageID`, `CategoryID`)
VALUES (5, 5);
INSERT INTO `GalleryImageCategories` (`GalleryImageID`, `CategoryID`)
VALUES (5, 3);
INSERT INTO `GalleryImageCategories` (`GalleryImageID`, `CategoryID`)
VALUES (6, 1);
INSERT INTO `GalleryImageCategories` (`GalleryImageID`, `CategoryID`)
VALUES (6, 2);
INSERT INTO `GalleryImageCategories` (`GalleryImageID`, `CategoryID`)
VALUES (7, 5);
INSERT INTO `GalleryImageCategories` (`GalleryImageID`, `CategoryID`)
VALUES (8, 4);
INSERT INTO `GalleryImageCategories` (`GalleryImageID`, `CategoryID`)
VALUES (9, 1);
INSERT INTO `GalleryImageCategories` (`GalleryImageID`, `CategoryID`)
VALUES (9, 4);
INSERT INTO `GalleryImageCategories` (`GalleryImageID`, `CategoryID`)
VALUES (10, 2);
INSERT INTO `GalleryImageCategories` (`GalleryImageID`, `CategoryID`)
VALUES (11, 3);
INSERT INTO `GalleryImageCategories` (`GalleryImageID`, `CategoryID`)
VALUES (12, 5);
