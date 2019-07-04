import React, { PropTypes } from "react";
import Paper from "material-ui/Paper";
import { grey800 } from "material-ui/styles/colors";
import { typography } from "material-ui/styles";
import { Link } from "react-router";

class ChatbotBox extends React.Component {

  render() {
    const { color, title, value, userList, chatbot, user } = this.props;

    const usersForChatbot = userList.filter(user => {
      if (user.chatbotIds.includes(chatbot.id))
        return user;
    })

    const styles = {
      paperSize: {
        height: 150,
        width: usersForChatbot.length > 6 ? 500 + (usersForChatbot.length - 6) * 46 : 500
      },
      content: {
        padding: "35px 50px",
        marginLeft: 120,
        height: 80,
      },
      number: {
        padding: "10px 0px",
        display: "block",
        fontWeight: typography.fontWeightLight,
        fontSize: 15,
        color: grey800
      },
      text: {
        fontSize: 20,
        fontWeight: typography.fontWeightMedium,
        color: grey800
      },
      iconSpan: {
        float: "left",
        height: 150,
        width: 150,
        textAlign: "center",
        backgroundColor: color
      },
      editSpan: {
        float: "right",
        textAlign: "center",
        padding: "5px 20px 0px 0px",
      },
      deleteSpan: {
        float: "right",
        textAlign: "center",
        padding: "5px 5px 0px 0px",
        cursor: "pointer"
      },
      icon: {
        marginTop: 25,
        height: 100,
        width: 100,
        maxWidth: "100%"
      },
      avatar: {
        marginLeft: "3px",
        marginRight: "3px",
      }
    };

    return (
      <Paper style={styles.paperSize}>
        <span style={styles.iconSpan}>
          <img style={styles.icon} src={`https://avatars.dicebear.com/v2/gridy/${title}.svg`} />
        </span>

        {
          user.companyOwner === true && (
          <div>
            <span style={styles.deleteSpan}>
              <img width={20} src={require("../../assets/img/delete.png")} onClick={() => this.props.openDeleteDialog()}/>
            </span>

            <span style={styles.editSpan}>
              <Link to={`${window.location.href}/edit`}>
                <img width={15} src={require("../../assets/img/edit-icon.svg")} />
              </Link>
            </span>
          </div>
          )
        }

        <div style={styles.content}>
          <span style={styles.text}>{title}</span>
          <span style={styles.number}>{value}</span>
          {
            usersForChatbot.map(user => {
              return (<img style={styles.avatar} width={40} src={`https://avatars.dicebear.com/v2/identicon/${user.firstName}-${user.lastName}.svg`} title={user.userName} />)
            })
          }
        </div>
      </Paper>
    );
  }
}

ChatbotBox.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string,
  userList: PropTypes.array,
  chatbot: PropTypes.object,
  user: PropTypes.object
};

export default ChatbotBox;
