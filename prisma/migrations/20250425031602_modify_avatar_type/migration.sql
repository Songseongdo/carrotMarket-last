/*
  Warnings:

  - You are about to alter the column `avatar` on the `User` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

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
    "avatar" INTEGER,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_User" ("avatar", "bio", "create_at", "email", "id", "password", "updated_at", "userId", "username") SELECT "avatar", "bio", "create_at", "email", "id", "password", "updated_at", "userId", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
