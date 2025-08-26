// Purpose is to access session in a client side hook

import { getSession } from "@/utils/auth";

export default async function GET(request: Request) {
  try {
    const session = await getSession();
    if (session) {
      return new Response(
        JSON.stringify({ status: "success", payload: session }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ status: "unauthenticated", payload: null }),
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error fetching session:", error);
    return new Response(
      JSON.stringify({ status: "error", message: "Internal server error" }),
      { status: 500 }
    );
  }
}
