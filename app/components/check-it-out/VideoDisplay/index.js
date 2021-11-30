import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  ImageBackground,
  Modal,
} from "react-native";
import Video from "react-native-video";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleLineIcon from "react-native-vector-icons/SimpleLineIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import styles from "./style";
import LikeSvg from "../../../assets/icons/like.svg";
import CommentIcon from "../../../assets/icons/comment.svg";
import SaveIcon from "../../../assets/icons/SaveIcon.svg";
import HammerIcon from "../../../assets/icons/hammer.svg";
import ShareIcon from "../../../assets/icons/share.svg";
import NavigationService from "../../../navigation/NavigationService";
import LikeIconSmall from "../../../assets/icons/LikeIconSmall.svg";
import SaveIconYellow from "../../../assets/icons/SaveIconYellow.svg";
import LikeSvgBlue from "./../../../assets/icons/LikeSvgBlue.svg";
import BidModal from "../../../screens/Dashboard/BidModal/index";
import { likeProduct, saveProduct } from "../../../api/check-it-in/Product";

import EncryptedStorage from "react-native-encrypted-storage";
const { width, height } = Dimensions.get("window");
import config from "react-native-config";
const axios = require("axios");
const Api = axios.create();
const backendServer = config.BACKEND_SERVER;
const routeBase = "v1";
class VideoDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: this.props.isSaved,
      liked: this.props.item.isLiked,
      addModal: false,
      likes: this.props.item.likes,
    };
  }
  // componentDidMount(){
  // 	this.setState({
  // 		likes: this.props.item.likes,
  // 	})
  // }
  hideAddModal = () => {
    this, this.setState({ addModal: false });
  };
  _handleLike = () => {
    // if (!this.state.liked) {
      likeProduct(this.props.item?.uid).then((res) => {
        this.setState({ likes: this.state.liked ? this.state.likes - 1 : this.state.likes + 1 });
        console.log(res.data);
        this.setState({ liked: !this.state.liked });
      });
    // }
  };
  _handleSave = () => {
    // if (!this.state.saved) {
      saveProduct(this.props.item?.uid).then((res) => {
        console.log(res.data);
        this.setState({ saved: !this.state.saved });
      });
    // }
  };
  render() {
    const { likes } = this.state;
    return (
      <View style={{ width: "100%" }}>
        <View style={{ width: "100%" }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("ProductDescription", {
                product: this.props.item,
              });
            }}
          >
            {console.log(this.props.item?.videoUrl)}
            <Video
              source={{
                uri: this.props.item?.videoUrl,
              }}
              // source={this.props.item?.videoUrl}
              repeat
              style={styles.video}
              // resizeMode="contain"
              muted={false}
              volume={0}
              resizeMode={"cover"}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{this.props.item.title}</Text>
          <Text style={styles.subTitle}>{this.props.item.description}</Text>
          <Text style={styles.price}>{this.props.item?.bidItNowPrice}</Text>
        </View>
        <View style={styles.videoMainContainer}>
          <View style={styles.innerLeft}>
            <View style={styles.dataContainer}>
              <TouchableOpacity
                style={styles.sellerTitleContainer}
                onPress={() => this.props.navigation.navigate("OthersProfile")}
              >
                <Image
                  source={this.props.item.profilePic}
                  style={styles.profile}
                  borderRadius={25}
                  borderWidth={1}
                  borderColor="#fff"
                />

                <Text style={styles.sellerTitle}>
                  {this.props.item?.user?.name}{" "}
                  <Text style={{ fontSize: 50 }}>.</Text>{" "}
                  <Text style={{ color: "#00FFE5" }}>Follow</Text>
                </Text>
              </TouchableOpacity>
              <View style={{ flexDirection: "row", paddingBottom: 20 }}>
                <View
                  style={{
                    paddingTop: 0,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 8,
                    },
                    shadowOpacity: 0.44,
                    shadowRadius: 10.32,
                    elevation: 16,
                  }}
                >
                  <LikeIconSmall />
                </View>

                <Text style={styles.views}>
                  {likes}
                  {" likes"}
                </Text>
              </View>

              {/* {this.props.item.questions?.map((question, index) => {
                return <Text style={styles.question}>{question}</Text>;
              })} */}

              {/* <Text style={styles.description} numberOfLines={4}>
                {this.props.item.description}
              </Text> */}

              {/* <View style={styles.tagsContainer}>
                  {this.props.item.tags?.map((item) => (
                    <Text
                      style={{
                        color: "#fff",
                        fontWeight: "bold",
                        marginBottom: 15,
                      }}
                    >
                      {item}{" "}
                    </Text>
                  ))}
                </View> */}
              {/* <View style={styles.sellerTitleContainer}>
                <Icon
                    name="md-musical-note"
                    size={18}
                    color="#fff"
                    style={{ marginRight: 10 }}
                  />
                <Text style={styles.sellerTitle}>
                  {this.props.item.sellerTitle}
                </Text>
              </View> */}
            </View>
          </View>

          <View style={styles.innerRight}>
            <View style={styles.iconsContainer}>
              <TouchableOpacity
                onPress={this._handleLike}
                style={styles.iconContainer}
              >
                {this.state.liked ? (
                  <LikeSvgBlue
                  // onPress={() => {
                  // 	this.setState({ liked: false });
                  // }}
                  />
                ) : (
                  <LikeSvg
                  // onPress={() => {
                  // 	this.setState({ liked: true });
                  // }}
                  />
                )}
              </TouchableOpacity>
              <View style={styles.iconContainer}>
                <CommentIcon />
              </View>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={this._handleSave}
              >
                {this.state.saved ? <SaveIconYellow /> : <SaveIcon />}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => {
                  this.setState({ addModal: true });
                }}
              >
                <HammerIcon />
              </TouchableOpacity>

              <View style={styles.iconContainer}>
                <ShareIcon />
              </View>
            </View>
            {/* <ImageBackground
              source={this.props.item.img}
              style={styles.profile}
              borderRadius={25}
              borderWidth={1}
              borderColor="#fff"
            >
              <TouchableOpacity style={styles.btn}>
                <Icon name="ios-add" color="#fff" size={15} />
              </TouchableOpacity>
            </ImageBackground> */}

            {/* <Text style={{ color: "#fff", marginBottom: 25 }}>1234</Text> */}

            {/* <MaterialCommunityIcon name="comment" size={45} color="#e5e5e5" /> */}
            {/* <Text style={{ color: "#fff", marginBottom: 25 }}>1234</Text> */}

            {/* <Icon
              name="logo-whatsapp"
              size={45}
              color="#4fce5d"
              style={{ marginBottom: 35 }}
            />

            <ImageBackground
              source={this.props.item.profilePic}
              style={styles.profile}
              borderRadius={25}
              borderWidth={1}
              borderColor="#fff"
            /> */}
          </View>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.addModal}
          onRequestClose={() => {}}
        >
          <BidModal
            handleSubmit={this.hideAddModal}
            hideAddModal={this.hideAddModal}
          />
        </Modal>
      </View>
    );
  }
}

export default VideoDisplay;
