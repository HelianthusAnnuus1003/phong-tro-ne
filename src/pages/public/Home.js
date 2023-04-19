import { React, useEffect, useState } from "react";
import { Province, Left, Right } from "../../components";
import { getPostsLimit } from "../../store/actions/post";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import * as actions from "../../store/actions/";

const Home = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const location = useLocation();

    const [categoryCode, setCategoryCode] = useState("");
    const { posts } = useSelector((state) => state.post);
    const { prices, areas, categories } = useSelector((state) => state.app);

    const formatVietnameseToEnglishString = (keyword) => {
        return keyword
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .split(" ")
            .join("-");
    };

    useEffect(() => {
        let params = [];
        for (let entry of searchParams.entries()) {
            params.push(entry);
        }
        let searchParamObject = {};
        params?.map(
            (i) => (searchParamObject = { ...searchParamObject, [i[0]]: i[1] })
        );
        dispatch(getPostsLimit(searchParamObject));
    }, [dispatch, searchParams]);

    useEffect(() => {
        const category = categories?.find(
            (item) =>
                `/${formatVietnameseToEnglishString(item.value)}` ===
                location.pathname
        );
        if (category) {
            setCategoryCode(category.code);
        }
    }, [categories, categoryCode, location.pathname]);

    useEffect(() => {
        dispatch(actions.getCategories());
        dispatch(actions.getPrices());
        dispatch(actions.getAreas());
    }, [dispatch]);

    return (
        <div className="mx-auto w-1100 mt-[10px] mb-[80px]">
            <header className="mb-[10px] w-full">
                <p className="text-[25px] text-primary font-bold mb-[5px]">
                    Kênh thông tin Phòng Trọ số 1 Việt Nam
                </p>
                <p className="text-[14px] text-primary">
                    Kênh thông tin Phòng Trọ số 1 Việt Nam - Website đăng tin
                    cho thuê phòng trọ, nhà nguyên căn, căn hộ, ở ghép nhanh,
                    hiệu quả với 100.000+ tin đăng và 2.500.000 lượt xem mỗi
                    tháng.
                </p>
            </header>
            <Province />
            <div className="flex items-start w-1100 gap-[15px]">
                <Left posts={posts} />
                <Right prices={prices} areas={areas} categories={categories} />
            </div>
        </div>
    );
};

export default Home;
