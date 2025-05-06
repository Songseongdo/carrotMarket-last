/*
  Warnings:

  - Added the required column `userId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT,
    "bio" TEXT,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_User" ("bio", "create_at", "email", "id", "password", "updated_at", "username") SELECT "bio", "create_at", "email", "id", "password", "updated_at", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
