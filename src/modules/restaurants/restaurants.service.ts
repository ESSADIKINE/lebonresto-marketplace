import { Injectable } from '@nestjs/common';
import { RestaurantsRepository } from './restaurants.repository';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { GoogleDriveService } from '../../google-drive/google-drive.service';

@Injectable()
export class RestaurantsService {
    constructor(
        private readonly restaurantsRepository: RestaurantsRepository,
        private readonly googleDriveService: GoogleDriveService,
    ) { }

    create(createRestaurantDto: CreateRestaurantDto) {
        return this.restaurantsRepository.create(createRestaurantDto);
    }

    findAll() {
        return this.restaurantsRepository.findAll();
    }

    findOne(id: string) {
        return this.restaurantsRepository.findOne(id);
    }

    update(id: string, updateRestaurantDto: UpdateRestaurantDto) {
        return this.restaurantsRepository.update(id, updateRestaurantDto);
    }

    remove(id: string) {
        return this.restaurantsRepository.remove(id);
    }

    // Relational methods
    getMenus(id: string) {
        return this.restaurantsRepository.findMenus(id);
    }

    getPlats(id: string) {
        return this.restaurantsRepository.findPlats(id);
    }

    getImages(id: string) {
        return this.restaurantsRepository.findImages(id);
    }

    getTags(id: string) {
        return this.restaurantsRepository.findTags(id);
    }

    getEvents(id: string) {
        return this.restaurantsRepository.findEvents(id);
    }

    getReservations(id: string) {
        return this.restaurantsRepository.findReservations(id);
    }

    getFeedback(id: string) {
        return this.restaurantsRepository.findFeedback(id);
    }

    async getSummary(id: string) {
        const restaurant = await this.findOne(id);
        const plats = await this.getPlats(id);
        const menus = await this.getMenus(id);
        const events = await this.getEvents(id);
        const feedback = await this.getFeedback(id);

        const avgRating = feedback.length > 0
            ? feedback.reduce((acc, curr) => acc + curr.rating, 0) / feedback.length
            : 0;

        return {
            ...restaurant,
            counts: {
                plats: plats.length,
                menus: menus.length,
                events: events.length,
                feedback: feedback.length,
            },
            avgRating,
        };
    }

    search(filters: { cityId?: string; categoryId?: string; tagId?: string; q?: string }) {
        return this.restaurantsRepository.search(filters);
    }

    /**
     * Creates or retrieves a Google Drive folder for a restaurant
     * @param id - The restaurant ID
     * @returns The updated restaurant with drive_folder_id
     */
    async createDriveFolderForRestaurant(id: string) {
        // 1) Fetch restaurant by id
        const restaurant = await this.restaurantsRepository.findOne(id);

        // 2) Ensure the folder exists in Google Drive
        const folderId = await this.googleDriveService.ensureRestaurantFolder(restaurant.name);

        // 3) Update restaurants.drive_folder_id in Supabase
        const updated = await this.restaurantsRepository.updateDriveFolderId(id, folderId);

        return updated;
    }
}

