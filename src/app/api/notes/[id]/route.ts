import connectMongoDB from "@/lib/mongodb";
import NoteModel from "@/models/noteModel";
import {NextRequest, NextResponse} from "next/server";

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
    const { id } = context.params;

    await connectMongoDB();
    await NoteModel.findByIdAndDelete(id);

    return NextResponse.json({ message: 'note deleted successfully' }, { status: 200 });
}

export async function GET(request: Request, {params}: { params: { id: string } }) {
    await connectMongoDB();
    const note = await NoteModel.findById(params.id);
    if (!note) {
        return NextResponse.json({message: "Note not found"}, {status: 404});
    }
    return NextResponse.json(note, {status: 200});
}

export async function PUT(request: Request, {params}: { params: { id: string } }) {
    await connectMongoDB();
    const {title, content} = await request.json();
    const updatedNote = await NoteModel.findByIdAndUpdate(
        params.id,
        {title, content}
    );
    return NextResponse.json(updatedNote);
}