import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import NoteModel from "@/models/noteModel";

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userId = session.user.id;

    // Connect to database
    await connectDB();

    // Delete all notes associated with the user
    await NoteModel.deleteMany({ userId: userId });

    // Delete the user account
    await User.findByIdAndDelete(userId);

    return NextResponse.json({ message: "Account deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting account:", error);
    return NextResponse.json({ error: "Failed to delete account" }, { status: 500 });
  }
}