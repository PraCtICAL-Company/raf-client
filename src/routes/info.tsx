import { createFileRoute } from '@tanstack/react-router'
import { useWorkers } from '../queries/queryHooks';

export const Route = createFileRoute('/info')({
  component: InfoComponent,
})

function InfoComponent() {
  const { data, isLoading } = useWorkers();

  return (
    <div className="flex justify-center font-[Montserrat] font-semibold">
      <div className="pt-(--navbar-height) mt-(--default-padding) p-(--default-padding)">
        <h1 className='text-5xl text-center mb-[1em]'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor est labore, voluptate eum dolorem et quo saepe placeat cumque rem earum blanditiis quae voluptas facilis doloremque excepturi laudantium natus alias?</h1>
        <article className='text-justify'>
          <p className='pb-(--default-padding)'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat enim fugit aliquam voluptatibus quo animi quis iure, totam corporis provident ut minus nostrum natus pariatur quidem aperiam id exercitationem distinctio.
            Iusto saepe, nesciunt, magnam fugit mollitia ipsa harum similique, temporibus rerum officia cum ullam delectus quibusdam velit dolorum necessitatibus tempore. Qui velit explicabo cupiditate error, corrupti ipsam sunt vel! Quibusdam?
            Consequuntur a cumque inventore ducimus minima natus aliquam? Repellendus cumque repellat recusandae rem, laudantium veniam voluptate officia at enim sint corrupti assumenda dolores provident dolore ex itaque doloremque modi. Accusantium?
            Ex adipisci repellendus eveniet voluptatum error, sunt impedit illo distinctio dolor aut. Exercitationem unde mollitia, porro, esse vitae autem perspiciatis sint reprehenderit reiciendis nulla voluptatum rerum voluptatibus tempora doloribus error.
            Fugiat adipisci minima voluptas dignissimos, quae eligendi esse ex mollitia quo! Adipisci soluta in, ipsam consequatur dolorem quisquam dignissimos minima suscipit officia eligendi, culpa, nisi corrupti sit eius quam libero!
          </p>
          <p>
            <img src="../../src/assets/svg/info/_1.svg" className='float-right pl-6' alt="" />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab odio tempore nulla ipsa ducimus minima quasi beatae, delectus, sint excepturi totam. Sapiente, quas adipisci. Adipisci nisi corrupti vero culpa. Dolorem.
            Reiciendis explicabo ratione nobis modi veritatis a, ad accusamus hic doloremque veniam rerum. Assumenda eos itaque, quos aperiam, neque doloribus, nemo sapiente numquam quam ex quod debitis. Quia, sint velit?
            Nostrum, odit nemo ea nesciunt fuga ratione quas molestiae quasi necessitatibus blanditiis eius alias unde voluptate autem. Sed animi quos beatae blanditiis porro consectetur assumenda, omnis, ullam, ut voluptatum vel.
            Adipisci quis dolorem fuga quaerat dicta excepturi iure rem veniam, illo nisi iusto nostrum quasi voluptas ratione quod. Eveniet unde enim ipsa quo pariatur quisquam magnam labore, iusto quae fugiat.
            Quisquam minima aliquam quidem fugiat non eligendi optio odio officiis nesciunt deleniti at suscipit debitis doloribus dolore nobis, vel quaerat enim nisi aperiam, nostrum quae et porro. Nesciunt, voluptates eveniet!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut modi assumenda debitis nihil eveniet temporibus corrupti vero quis iure, repellendus fuga velit quisquam quaerat exercitationem atque at ratione natus delectus!
            Neque amet odio vero voluptates harum accusantium tempora animi blanditiis assumenda. Animi error nesciunt ex incidunt nobis? Veritatis autem fugiat debitis saepe velit sunt impedit minus? Dicta consectetur aliquid qui!
            Praesentium quia error ullam iste fugit nam, vel pariatur voluptatem animi soluta officia eos hic? Dolorem omnis veniam quia maiores optio nam blanditiis aliquid minima quisquam odio, explicabo, numquam maxime.
            Unde quod dolore commodi numquam nam in modi quam ipsam velit maxime similique culpa deserunt omnis, aperiam voluptatum eum nesciunt autem. Aliquid repellendus recusandae beatae praesentium molestiae! In, repellat quae?
            Animi iste excepturi debitis earum nulla pariatur non saepe, veniam reprehenderit, recusandae tenetur rerum, assumenda ducimus. Accusamus rem quibusdam natus porro! Consequatur repellat expedita aut culpa cumque modi quis ea.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis ullam rerum perferendis explicabo ad numquam odio laborum temporibus. Modi eligendi in error, obcaecati expedita adipisci illum nobis minima quae odio!
            Est molestiae quam recusandae cum eveniet facilis alias impedit quia tenetur laudantium, nihil suscipit aut, aperiam vitae in nemo veniam perspiciatis et quaerat quasi voluptate odit eius! Sit, molestiae voluptatibus.
            Minus eveniet et soluta nesciunt aliquam quo ipsum, nisi quis fugiat, necessitatibus ipsam magnam blanditiis, veritatis laborum pariatur ipsa laboriosam qui iste quos beatae temporibus odio. Officia provident quis eligendi.
            Cupiditate ad dolor fugiat earum ullam dolorem quibusdam, dolores qui iure eos iste, incidunt repudiandae eaque, reiciendis laudantium debitis aperiam placeat fugit labore eum! Fugit sequi vero eos labore non.
            Iure ut facilis, sed aut tenetur quo? Velit sapiente dolorum quibusdam voluptatem ipsa nostrum ut consequatur quis nesciunt magni consectetur ea vitae enim blanditiis tempore nobis, reprehenderit eius! Voluptatibus, minima!
          </p>
          <p>
            <img src="../../src/assets/svg/info/_2.svg" className='float-left pr-6' alt="" />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab odio tempore nulla ipsa ducimus minima quasi beatae, delectus, sint excepturi totam. Sapiente, quas adipisci. Adipisci nisi corrupti vero culpa. Dolorem.
            Reiciendis explicabo ratione nobis modi veritatis a, ad accusamus hic doloremque veniam rerum. Assumenda eos itaque, quos aperiam, neque doloribus, nemo sapiente numquam quam ex quod debitis. Quia, sint velit?
            Nostrum, odit nemo ea nesciunt fuga ratione quas molestiae quasi necessitatibus blanditiis eius alias unde voluptate autem. Sed animi quos beatae blanditiis porro consectetur assumenda, omnis, ullam, ut voluptatum vel.
            Adipisci quis dolorem fuga quaerat dicta excepturi iure rem veniam, illo nisi iusto nostrum quasi voluptas ratione quod. Eveniet unde enim ipsa quo pariatur quisquam magnam labore, iusto quae fugiat.
            Quisquam minima aliquam quidem fugiat non eligendi optio odio officiis nesciunt deleniti at suscipit debitis doloribus dolore nobis, vel quaerat enim nisi aperiam, nostrum quae et porro. Nesciunt, voluptates eveniet!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut modi assumenda debitis nihil eveniet temporibus corrupti vero quis iure, repellendus fuga velit quisquam quaerat exercitationem atque at ratione natus delectus!
            Neque amet odio vero voluptates harum accusantium tempora animi blanditiis assumenda. Animi error nesciunt ex incidunt nobis? Veritatis autem fugiat debitis saepe velit sunt impedit minus? Dicta consectetur aliquid qui!
            Praesentium quia error ullam iste fugit nam, vel pariatur voluptatem animi soluta officia eos hic? Dolorem omnis veniam quia maiores optio nam blanditiis aliquid minima quisquam odio, explicabo, numquam maxime.
            Unde quod dolore commodi numquam nam in modi quam ipsam velit maxime similique culpa deserunt omnis, aperiam voluptatum eum nesciunt autem. Aliquid repellendus recusandae beatae praesentium molestiae! In, repellat quae?
            Animi iste excepturi debitis earum nulla pariatur non saepe, veniam reprehenderit, recusandae tenetur rerum, assumenda ducimus. Accusamus rem quibusdam natus porro! Consequatur repellat expedita aut culpa cumque modi quis ea.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis ullam rerum perferendis explicabo ad numquam odio laborum temporibus. Modi eligendi in error, obcaecati expedita adipisci illum nobis minima quae odio!
            Est molestiae quam recusandae cum eveniet facilis alias impedit quia tenetur laudantium, nihil suscipit aut, aperiam vitae in nemo veniam perspiciatis et quaerat quasi voluptate odit eius! Sit, molestiae voluptatibus.
            Minus eveniet et soluta nesciunt aliquam quo ipsum, nisi quis fugiat, necessitatibus ipsam magnam blanditiis, veritatis laborum pariatur ipsa laboriosam qui iste quos beatae temporibus odio. Officia provident quis eligendi.
            Cupiditate ad dolor fugiat earum ullam dolorem quibusdam, dolores qui iure eos iste, incidunt repudiandae eaque, reiciendis laudantium debitis aperiam placeat fugit labore eum! Fugit sequi vero eos labore non.
            Iure ut facilis, sed aut tenetur quo? Velit sapiente dolorum quibusdam voluptatem ipsa nostrum ut consequatur quis nesciunt magni consectetur ea vitae enim blanditiis tempore nobis, reprehenderit eius! Voluptatibus, minima!

          </p>
        </article>
        <div className="w-full flex justify-center mt-(--default-padding)">
          {
            isLoading ?
              <div className="">Loading...</div>
              :
              <div className="flex justify-center gap-x-(--default-padding)">
                {
                  data!.map(worker => (
                    <div className="w-[200px]">
                      <div className="w-full h-[200px] bg-red-900 rounded-4xl bg-center bg-cover relative" style={{ backgroundImage: `url(../../src/assets/${worker.imageUrl})` }}>

                      </div>
                      <div className='text-(--foreground) text-sm text-center mt-[1rem]'>
                        {worker.description}
                      </div>
                    </div>

                  ))
                }
              </div>
          }

        </div>
      </div>

    </div>
  );
}
