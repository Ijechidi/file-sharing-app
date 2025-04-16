import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')

    if (code) {
      const supabase = createRouteHandlerClient({ cookies })
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        return NextResponse.redirect(new URL('/login?error=auth', requestUrl.origin))
      }
    }

    // Successful authentication
    return NextResponse.redirect(new URL('/dashboard', requestUrl.origin))
  } catch (error) {
    // En cas d'erreur, rediriger vers la page de login
    return NextResponse.redirect(new URL('/login', request.url))
  }
}