import { ContactBody, ContactResponse } from '@app-types/api-contact';
import { getDB } from '@helper/db';
import { isEmailInvalid, isTextInvalid } from '@helper/validators';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const contactData = (await request.json()) as ContactBody;

  if (
    isEmailInvalid(contactData.email) ||
    isTextInvalid(contactData.name) ||
    isTextInvalid(contactData.message)
  ) {
    return NextResponse.json<ContactResponse>(
      {
        message: 'Invalid data',
      },
      {
        status: 422,
      }
    );
  }

  try {
    const db = await getDB();
    const result = await db.collection('contacts').insertOne({
      ...contactData
    });

    return NextResponse.json<ContactResponse>(
      {
        message: 'Contact sent successfully!',
        contact: result,
      },
      {
        status: 201,
      }
    );
  } catch(err) {
    console.log(err);
    return NextResponse.json<ContactResponse>(
      {
        message: 'DB Connection Error Occured',
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  return NextResponse.json<ContactResponse>(
    {
      message: 'Test',
    },
    {
      status: 200,
    }
  );
}
