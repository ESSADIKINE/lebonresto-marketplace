import { Injectable } from '@nestjs/common';
import { FeedbackRepository } from './feedback.repository';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(private readonly feedbackRepository: FeedbackRepository) {}

  create(createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackRepository.create(createFeedbackDto);
  }

  findAll() {
    return this.feedbackRepository.findAll();
  }

  findOne(id: string) {
    return this.feedbackRepository.findOne(id);
  }

  update(id: string, updateFeedbackDto: UpdateFeedbackDto) {
    return this.feedbackRepository.update(id, updateFeedbackDto);
  }

  remove(id: string) {
    return this.feedbackRepository.remove(id);
  }
}
