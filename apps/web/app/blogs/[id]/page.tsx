import { FaFire, FaHeart, FaThumbsUp } from "react-icons/fa6";

/* eslint-disable @next/next/no-img-element */
export default function BlogDetail({ params }: { params: { id: string } }) {
  console.log(params.id);
  return (
    <div className="m-10 mockup-code">
      {/*<!-- Component: Social story card --> */}
      <div className="px-10 grid grid-cols-1 place-items-center">
        {/*  <!-- Body--> */}
        <div>
          <h1 className="mb-5 text-5xl font-extrabold">Blog title</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
            velit voluptatem temporibus! Praesentium voluptatibus quae nihil
            aperiam minima similique nulla, dolorem recusandae odio dolorum
            optio harum molestiae, dolore cupiditate impedit, quisquam placeat
            tempore deleniti eligendi reprehenderit qui a consequuntur autem.
            Voluptatem ea possimus, ratione quo praesentium veniam eveniet
            facere quod, repudiandae cupiditate nemo nam. Explicabo, sint
            ratione! Ipsa harum eligendi cupiditate dicta, accusantium quia,
            excepturi dolor voluptates quasi perspiciatis officiis delectus? Non
            labore vitae esse ratione vero repellat eos perferendis cum
            blanditiis doloremque laudantium dolores dicta numquam quia quae
            inventore, nostrum voluptate repellendus doloribus, libero
            consequatur, nobis est! Ullam officia tempore hic, ad nam voluptatum
            quod commodi cupiditate optio aspernatur a neque, rerum reiciendis
            earum, asperiores laborum corporis praesentium? Aut eaque, modi
            sint, ex perspiciatis animi fugiat, magni vero debitis eveniet qui
            magnam ipsa dolore illo praesentium quibusdam distinctio soluta
            repellat culpa! Neque reiciendis mollitia, qui temporibus cupiditate
            voluptate doloremque saepe inventore vitae repellat id, minima quis
            deleniti rerum totam natus, aspernatur facilis odio sequi
            perspiciatis. Culpa, possimus dolor ratione enim nam rerum omnis
            aspernatur, fuga itaque commodi dignissimos quaerat sint sequi
            debitis, dolore necessitatibus tenetur tempore. Voluptates maxime,
            sit voluptatibus dolores dolorem sed, ratione earum laborum
            doloremque qui quam, voluptatum quo aut recusandae similique
            molestias voluptatem dolorum praesentium nemo iusto commodi.
            Perspiciatis velit repudiandae ex dolore, alias est nisi eaque vel
            debitis saepe ut possimus, corporis facere vitae labore laboriosam
            ipsa sunt tempore consequuntur magni, aliquid qui! Omnis, reiciendis
            magni. Eum id libero nihil iusto vel voluptas corporis odio
            molestiae laboriosam culpa nisi aliquid modi velit fugiat aperiam
            possimus quae, itaque tempore at ducimus illo odit hic. Dicta quae
            debitis, pariatur laudantium consequuntur asperiores. Unde,
            expedita! Illum suscipit eveniet eius, dolorum perspiciatis deserunt
            amet explicabo fugit beatae necessitatibus eaque fuga, vero, itaque
            libero cumque velit iusto impedit harum non repudiandae asperiores
            laudantium rem debitis et? Quidem enim ipsum, ab ad beatae
            reprehenderit praesentium id dignissimos alias assumenda quas
            reiciendis earum perspiciatis, quia placeat itaque molestiae nihil
            aliquid vel dolores autem? Numquam non maiores possimus quis impedit
            quod hic dicta unde, atque alias architecto ab laudantium corrupti
            earum animi deleniti adipisci autem? Facere eveniet cum modi autem,
            voluptate qui iusto repellat, provident asperiores aperiam labore
            doloremque voluptatibus veniam similique eius enim molestias
            facilis. Aperiam sunt nam maiores recusandae praesentium ad ea, quo
            molestiae quia asperiores accusantium, soluta labore est. Corrupti
            obcaecati, facere asperiores esse ratione, fuga placeat magni
            aspernatur explicabo assumenda animi possimus aliquid, porro
            inventore cum vitae consequuntur optio vel beatae iste sed
            temporibus! Ipsam explicabo distinctio numquam ea consectetur veniam
            nam animi, praesentium, nemo, maxime corporis vitae iure obcaecati!
            Numquam pariatur, officia unde tenetur quam eius ab, harum at
            quaerat ad modi rem optio vitae illo ipsam iure ex omnis magnam
            rerum voluptatibus maiores sed? Laudantium deserunt unde
            consequuntur corrupti eum fuga reiciendis qui eos hic tempore.
            Maiores totam omnis necessitatibus, eius cumque excepturi
            dignissimos tempora exercitationem similique repellat? Eius ullam
            maxime, eaque sunt consectetur assumenda, qui ab quaerat amet
            aliquid veniam hic ipsam corrupti incidunt consequatur! Magni nulla
            in amet sequi nemo nam deleniti est id laboriosam quam corporis,
            vitae explicabo inventore sit ipsum. Hic molestiae officia mollitia
            earum optio magnam rerum, quisquam natus, repellendus quo beatae
            accusantium aliquid culpa error deserunt molestias debitis aperiam
            perferendis ducimus voluptatum! Officiis quo maxime quis accusamus
            vitae sit repellat! Quasi sequi perferendis velit quae vero
            consequuntur culpa. Harum doloribus maiores praesentium pariatur
            consectetur esse, earum nam eaque maxime enim quas, amet nihil
            expedita, dolorem doloremque neque? At, tempore ea quis earum quidem
            expedita aspernatur voluptatum modi obcaecati facere architecto
            magnam explicabo quibusdam accusantium incidunt. Nihil blanditiis
            cum tenetur asperiores eos est, possimus commodi, dolore voluptas
            quidem nobis tempora exercitationem. Ullam totam officia eius illo
            quasi corporis inventore consequatur ducimus? Cupiditate autem animi
            saepe earum, suscipit sapiente, accusantium excepturi possimus est
            qui, reiciendis nobis dolorem adipisci mollitia debitis eaque natus
            quibusdam voluptatem assumenda ex inventore nam veniam.
          </p>
        </div>
      </div>
      {/*<!-- End Social story card --> */}

      <div className="px-10 ">
        {/*  <!-- Action icon buttons --> */}
        <div className="flex gap-5 items-center my-5">
          <button className="btn btn-primary">
            <FaHeart />
            12
          </button>
          <button className="btn btn-primary">
            <FaThumbsUp />
            12
          </button>
          <button className="btn btn-primary">
            <FaFire />
            12
          </button>
        </div>

        {/*  <!-- Header--> */}
        <div>
          <header className="flex gap-4">
            <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full text-white">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                alt="user name"
                width="48"
                height="48"
                className="max-w-full rounded-full"
              />
            </span>
            <div>
              <h3 className="text-xl font-medium">By Mary Jay</h3>
              <p className="text-sm text-slate-400">Jun 3 2023</p>
            </div>
          </header>
        </div>
      </div>
    </div>
  );
}
