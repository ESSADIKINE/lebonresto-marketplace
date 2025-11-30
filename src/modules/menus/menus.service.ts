import { Injectable, BadRequestException } from '@nestjs/common';
import { MenusRepository } from './menus.repository';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { CloudinaryService } from '../images/cloudinary.service';
@Injectable()
export class MenusService {
  constructor(
    private readonly menusRepository: MenusRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) { }

  create(createMenuDto: CreateMenuDto) {
    return this.menusRepository.create(createMenuDto);
  }

  findAll() {
    return this.menusRepository.findAll();
  }

  findOne(id: string) {
    return this.menusRepository.findOne(id);
  }

  update(id: string, updateMenuDto: UpdateMenuDto) {
    return this.menusRepository.update(id, updateMenuDto);
  }

  remove(id: string) {
    return this.menusRepository.remove(id);
  }

  /**
   * Upload a menu PDF file to Cloudinary and create menu entry
   * @param file - PDF file
   * @param restaurantId - Restaurant ID
   * @param title - Menu title
   * @param description - Menu description (optional)
   */
  async uploadMenuPdf(
    file: Express.Multer.File,
    restaurantId: string,
    title: string,
    description?: string,
  ) {
    if (!file) {
      throw new BadRequestException('Aucun fichier PDF reçu');
    }

    // Check menu limit (max 10)
    const currentMenuCount =
      await this.menusRepository.countByRestaurant(restaurantId);
    if (currentMenuCount >= 10) {
      throw new BadRequestException(
        'Le restaurant a atteint la limite de 10 menus',
      );
    }

    if (file.mimetype !== 'application/pdf') {
      throw new BadRequestException('Le fichier doit être un PDF');
    }

    // Generate a unique public_id with .pdf extension to ensure correct Content-Type/Disposition
    const uniqueId = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const publicId = `menu-${uniqueId}.pdf`;

    // Upload PDF to Cloudinary as 'raw' (public) with explicit public_id
    const uploadResult = await this.cloudinaryService.uploadFile(file, 'raw', {
      public_id: publicId,
      access_mode: 'public',
      type: 'upload',
    });

    // Create menu entry with the Cloudinary URL
    const menuData: CreateMenuDto = {
      restaurant_id: restaurantId,
      title,
      description: description || '',
      pdf_url: uploadResult.secure_url,
    };

    return this.menusRepository.create(menuData);
  }
}
