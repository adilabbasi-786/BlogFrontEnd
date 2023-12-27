import React, { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import BreadCrumbs from "../../components/BreadCrumbs";
import { images, stables } from "../../constants";
import { Link, useParams } from "react-router-dom";
import SuggestedPost from "./container/SuggestedPost";
import CommentsContainer from "../../components/comments/CommentsContainer";
import SocialShareButtons from "../../components/SocialShareButtons";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getSinglePosts } from "../../services/index/Posts";

const postsData = [
  {
    id: "1",
    image: images.post1Img,
    title: "Help Children get better Education",
    createdAt: "2023-01-28T15:35:53.607+0000",
  },
  {
    id: "2",
    image: images.post1Img,
    title: "Help Children get better Education",
    createdAt: "2023-10-28T15:35:53.607+0000",
  },
  {
    id: "3",
    image: images.post1Img,
    title: "Help Children get better Education",
    createdAt: "2023-01-28T15:35:53.607+0000",
  },
  {
    id: "4",
    image: images.post1Img,
    title: "Education beats war",
    createdAt: "2023-01-28T15:35:53.607+0000",
  },
];
const tagData = [
  "medical",
  "LifeStyle",
  "Education",
  "medical",
  "LifeStyle",
  "Education",
];
function ArticlesDetailPage() {
  const { slug } = useParams();
  const [breadCrumbsData, setBreadCrumbsData] = useState([]);

  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => getSinglePosts({ slug }),
    onSettled: (data) => {},
  });
  useEffect(() => {
    if (data === undefined) {
      return;
    }
    setBreadCrumbsData([
      { name: "Home", link: "/" },
      { name: "Blog", link: "/blog" },
      { name: "Article title", link: `/blog/${data.slug}` },
    ]);

    console.log("data", data);
  }, [data]);
  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <MainLayout>
        <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
          <article className="flex-1">
            <BreadCrumbs data={breadCrumbsData} />

            <img
              className="rounded-xl w-full"
              src={
                data?.photo
                  ? stables.UPLOAD_FOLDER_BASE_URL + data?.data?.photo
                  : images.samplePostImage
              }
              alt={data?.data?.title}
            />
            {console.log("images", images.samplePostImage)}
            <div className="mt-4 flex gap-2">
              {data?.categories?.map((category) => (
                <Link
                  to={`/blog?category=${category.name}`}
                  className="text-primary text-sm font-roboto inline-block md:text-base"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <h1 className="text-xl font-medium font-roboto mt-4 text-dark-hard md:text-[26px]">
              {data?.data?.title}
            </h1>
            <div className="mt-4 text-dark-sofa">
              <p className="leading-7">
                Lorem ipsum dolor sit amet consec tetur, adipisicing elit.
                Possimus fuga, consectetur mollitia ab voluptates facilis enim
                excepturi sed perferendis placeat, doloribus temporibus eius.
                Omnis eos quas consequatur corrupti commodi in ratione eius
                maxime voluptatum inventore incidunt culpa laboriosam excepturi
                quidem voluptatibus ad unde alias hic cupiditate, sunt
                perspiciatis veniam quia!
              </p>
            </div>
            <CommentsContainer className="mt-10" logginedUserId="a" />
          </article>
          <div>
            <SuggestedPost
              header="Latest Article"
              posts={postsData}
              tags={tagData}
              className="mt-8 lg:mt-0 lg:max-w-xs"
            />
            <div className="mt-7">
              <h2 className="font-roboto font-medium text-dark-hard mb-4 md:text-xl">
                Share on:
              </h2>
              <SocialShareButtons
                url={encodeURI(window.location.href)}
                title={encodeURIComponent("Client-side Server")}
              />
            </div>
          </div>
        </section>
      </MainLayout>
    </div>
  );
}

export default ArticlesDetailPage;
