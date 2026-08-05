import {cookies} from "next/headers";


export const POST = async()  => {

    try {

            const getcookies = await cookies();

            getcookies.delete("token")

            return Response.json(

                {message:"Succees"},
                {status:200}
            )
    }

    catch (error) {

        return Response.json(

            {message:error.message},
            {status:500}
        )
    }
}