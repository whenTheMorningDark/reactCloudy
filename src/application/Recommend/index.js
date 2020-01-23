import React, { useEffect } from 'react';
import Slider from '../../components/slider';
import { connect } from "react-redux";
import * as actionTypes from './store/actionCreators';
import RecommendList from '../../components/list';
import Scroll from '../../baseUI/scroll';
import Loading from '../../baseUI/loading/index';
import { forceCheck } from 'react-lazyload';
import {
	Content
} from './style.js';
// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
	// 不要在这里将数据 toJS
	// 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
	bannerList: state.getIn(['recommend', 'bannerList']),
	recommendList: state.getIn(['recommend', 'recommendList']),
	enterLoading: state.getIn(['recommend', 'enterLoading'])
});
// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
	return {
		getBannerDataDispatch () {
			dispatch(actionTypes.getBannerList());
		},
		getRecommendListDataDispatch () {
			dispatch(actionTypes.getRecommendList());
		},
	}
};
function Recommend (props) {
	console.log(props)
	// 第九章
	const { bannerList, recommendList, enterLoading } = props;
	const { getBannerDataDispatch, getRecommendListDataDispatch } = props;
	useEffect(() => {
		if (!bannerList.size) {
			getBannerDataDispatch();
		}
		if (!recommendList.size) {
			getRecommendListDataDispatch();
		}
	}, [bannerList.size, recommendList.size, getBannerDataDispatch, getRecommendListDataDispatch])
	const bannerListJS = bannerList ? bannerList.toJS() : [];
	const recommendListJS = recommendList ? recommendList.toJS() : [];

	return (
		<Content >
			<Scroll className="list" onScroll={forceCheck} >
				<div >
					<Slider bannerList={
						bannerListJS
					} >
					</Slider>
					<RecommendList recommendList={
						recommendListJS
					} >
					</RecommendList>
				</div>
			</Scroll>
			{enterLoading ? <Loading></Loading> : null}
		</Content>
	);
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend));