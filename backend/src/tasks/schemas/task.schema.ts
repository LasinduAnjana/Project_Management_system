import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, SchemaTypes } from 'mongoose';
import { TeamRoles } from 'src/enums/teamRoles.enum';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: Date })
  description: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    required: true,
    default: [],
  })
  assignee: String[];

  
}

export const TaskSchema = SchemaFactory.createForClass(Task);
