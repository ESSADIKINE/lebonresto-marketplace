import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

@Injectable()
export class GoogleDriveService {
    private drive;

    constructor() {
        this.drive = google.drive({ version: 'v3', auth: this.createAuthClient() });
    }

    /**
     * Creates a JWT authentication client using service account credentials from environment variables
     */
    private createAuthClient(): JWT {
        const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
        const privateKey = process.env.GOOGLE_PRIVATE_KEY;

        if (!clientEmail || !privateKey) {
            throw new InternalServerErrorException(
                'Les variables d\'environnement GOOGLE_CLIENT_EMAIL et GOOGLE_PRIVATE_KEY doivent être définies',
            );
        }

        // Convert escaped newlines to actual newlines
        const privateKeyWithNewlines = privateKey.replace(/\\n/g, '\n');

        const auth = new google.auth.JWT({
            email: clientEmail,
            key: privateKeyWithNewlines,
            scopes: ['https://www.googleapis.com/auth/drive.file'],
        });

        return auth;
    }

    /**
     * Creates a new folder in Google Drive
     * @param name - The name of the folder to create
     * @param parentId - The ID of the parent folder
     * @returns Object containing the folder id and name
     */
    async createFolder(
        name: string,
        parentId: string,
    ): Promise<{ id: string; name: string }> {
        try {
            const response = await this.drive.files.create({
                requestBody: {
                    name: name,
                    mimeType: 'application/vnd.google-apps.folder',
                    parents: [parentId],
                },
                fields: 'id, name',
            });

            return {
                id: response.data.id,
                name: response.data.name,
            };
        } catch (error) {
            throw new InternalServerErrorException(
                `Erreur lors de la création du dossier Drive: ${error.message}`,
            );
        }
    }

    /**
     * Searches for a folder by name in a specific parent folder
     * @param name - The name of the folder to search for
     * @param parentId - The ID of the parent folder to search in
     * @returns The folder ID if found, null otherwise
     */
    async findFolderByName(name: string, parentId: string): Promise<string | null> {
        try {
            const response = await this.drive.files.list({
                q: `mimeType = 'application/vnd.google-apps.folder' and name = '${name}' and '${parentId}' in parents and trashed = false`,
                fields: 'files(id, name)',
                pageSize: 1,
            });

            if (response.data.files && response.data.files.length > 0) {
                return response.data.files[0].id;
            }

            return null;
        } catch (error) {
            throw new InternalServerErrorException(
                `Erreur lors de la recherche du dossier Drive: ${error.message}`,
            );
        }
    }

    /**
     * Ensures a restaurant folder exists in Google Drive
     * Creates the folder if it doesn't exist, returns existing folder ID if it does
     * @param restaurantName - The name of the restaurant
     * @returns The Google Drive folder ID
     */
    async ensureRestaurantFolder(restaurantName: string): Promise<string> {
        const parentId = process.env.GOOGLE_DRIVE_FOLDER_ID;

        if (!parentId) {
            throw new InternalServerErrorException(
                'La variable d\'environnement GOOGLE_DRIVE_FOLDER_ID n\'est pas définie',
            );
        }

        // Check if folder already exists
        const existingFolderId = await this.findFolderByName(restaurantName, parentId);

        if (existingFolderId) {
            return existingFolderId;
        }

        // Create new folder if it doesn't exist
        const newFolder = await this.createFolder(restaurantName, parentId);
        return newFolder.id;
    }
}
