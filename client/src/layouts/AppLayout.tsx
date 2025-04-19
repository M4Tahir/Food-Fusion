import { Outlet } from "react-router-dom";
import { Footer } from "../components";
import { Header } from "../components/Header";

const AppLayout = () => {
  return (
    <div className="grid h-dvh grid-rows-[auto_1fr_auto]">
      <Header />
      <main>
        <div className="space-y-4">
          <p className="text-foreground bg-background mx-auto w-[800px] rounded-2xl border border-pink-50 px-6 py-8">
            <span>
              Nihil, rerum voluptatibus. Ad alias aliquam aut consequatur
              corporis dignissimos dolorum eius enim eum iusto libero maiores
              necessitatibus nihil, nisi nostrum officiis placeat porro,
              quaerat, qui quos soluta sunt velit.
            </span>
            <span>
              Cumque esse facere laudantium modi molestias porro provident
              quisquam veniam? Amet atque deserunt doloribus ipsum iste iure
              laudantium libero magni maxime minima numquam, quibusdam quidem
              quos, ratione reprehenderit veritatis voluptas?
            </span>
            <span>
              Accusantium delectus deleniti deserunt exercitationem nostrum
              perferendis, quam sunt vel vitae voluptate. Earum, fugiat, sed? Ad
              assumenda, dolore doloremque eius eligendi error, excepturi nihil
              numquam omnis quidem quos recusandae suscipit.
            </span>
          </p>
          <p className="text-foreground bg-background mx-auto w-[800px] rounded-2xl border border-pink-50 px-6 py-8">
            <span>
              Nihil, rerum voluptatibus. Ad alias aliquam aut consequatur
              corporis dignissimos dolorum eius enim eum iusto libero maiores
              necessitatibus nihil, nisi nostrum officiis placeat porro,
              quaerat, qui quos soluta sunt velit.
            </span>
            <span>
              Cumque esse facere laudantium modi molestias porro provident
              quisquam veniam? Amet atque deserunt doloribus ipsum iste iure
              laudantium libero magni maxime minima numquam, quibusdam quidem
              quos, ratione reprehenderit veritatis voluptas?
            </span>
            <span>
              Accusantium delectus deleniti deserunt exercitationem nostrum
              perferendis, quam sunt vel vitae voluptate. Earum, fugiat, sed? Ad
              assumenda, dolore doloremque eius eligendi error, excepturi nihil
              numquam omnis quidem quos recusandae suscipit.
            </span>
          </p>
          <p className="text-foreground bg-background mx-auto w-[800px] rounded-2xl border border-pink-50 px-6 py-8">
            <span>
              Nihil, rerum voluptatibus. Ad alias aliquam aut consequatur
              corporis dignissimos dolorum eius enim eum iusto libero maiores
              necessitatibus nihil, nisi nostrum officiis placeat porro,
              quaerat, qui quos soluta sunt velit.
            </span>
            <span>
              Cumque esse facere laudantium modi molestias porro provident
              quisquam veniam? Amet atque deserunt doloribus ipsum iste iure
              laudantium libero magni maxime minima numquam, quibusdam quidem
              quos, ratione reprehenderit veritatis voluptas?
            </span>
            <span>
              Accusantium delectus deleniti deserunt exercitationem nostrum
              perferendis, quam sunt vel vitae voluptate. Earum, fugiat, sed? Ad
              assumenda, dolore doloremque eius eligendi error, excepturi nihil
              numquam omnis quidem quos recusandae suscipit.
            </span>
          </p>{" "}
          <p className="text-foreground bg-background mx-auto w-[800px] rounded-2xl border border-pink-50 px-6 py-8">
            <span>
              Nihil, rerum voluptatibus. Ad alias aliquam aut consequatur
              corporis dignissimos dolorum eius enim eum iusto libero maiores
              necessitatibus nihil, nisi nostrum officiis placeat porro,
              quaerat, qui quos soluta sunt velit.
            </span>
            <span>
              Cumque esse facere laudantium modi molestias porro provident
              quisquam veniam? Amet atque deserunt doloribus ipsum iste iure
              laudantium libero magni maxime minima numquam, quibusdam quidem
              quos, ratione reprehenderit veritatis voluptas?
            </span>
            <span>
              Accusantium delectus deleniti deserunt exercitationem nostrum
              perferendis, quam sunt vel vitae voluptate. Earum, fugiat, sed? Ad
              assumenda, dolore doloremque eius eligendi error, excepturi nihil
              numquam omnis quidem quos recusandae suscipit.
            </span>
          </p>
        </div>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
