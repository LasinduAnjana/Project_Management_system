import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, SchemaTypes } from 'mongoose';
import { TeamRoles } from 'src/enums/teamRoles.enum';

export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: Date })
  deadline: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Tasks',
    required: true,
    default: [],
  })
  tasks: String[];

  @Prop(
    raw([
      {
        user: { type: mongoose.Schema.Types.ObjectId },
        teamRole: { type: String, enum: TeamRoles },
      },
    ]),
  )
  members: Record<string, any>[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
