import Ember from 'ember';

export default Ember.Service.extend({
	emailUser(receiver, sender, emailObject){
		console.log(emailObject)
		emailjs.send("gmail", "added_to_post", {
			receiver_email: receiver.email,
			receiver_fullname: receiver.firstname + " " + receiver.lastname,
			sender_email: sender.email,
			sender_fullname: sender.firstname + " " + sender.lastname,
			post_password: emailObject.password,
			post_url: generateURL(sender)
		})
	}
});

function generateURL (sender) {
	let url = "http://localhost:4200/profile-public/" + sender._id;
	console.log(url)
	return url
}
