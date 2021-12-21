import emailjs from "emailjs-com";
import {useState} from "react";

const Contact = () => {
	// Email message error
	const [emailMsg, setEmailMsg] = useState<string>("");

	// Default state/value for inputs
	const [fName, setfName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [message, setMessage] = useState<string>("");

	// Validation error message
	const [fNameErr, setfNameErr] = useState<string>("");
	const [emailErr, setEmailErr] = useState<string>("");
	const [messageErr, setMessageErr] = useState<string>("");

	// Validation functions
	const validatefName = (): void => {
		if (fName.length === 0) {
			setfNameErr("");
			return;
		}
		if (fName.length < 2) {
			setfNameErr("Please provide a name");
			setTimeout(() => {
				setfNameErr("");
			}, 5000);
		} else {
			setfNameErr("");
		}
	};
	const validateEmail = (): void => {
		if (email.length === 0) {
			setEmailErr("");
			return;
		}
		if (!email.includes("@") || !email.includes(".com")) {
			setEmailErr("Please provide a valid email");
			setTimeout(() => {
				setEmailErr("");
			}, 5000);
		} else {
			setEmailErr("");
		}
	};
	const validateMessage = (): void => {
		if (message.length === 0) {
			setMessageErr("");
			return;
		}
		if (message.length < 2) {
			setMessageErr("Please provide a message");
			setTimeout(() => {
				setMessageErr("");
			}, 5000);
		} else {
			setMessageErr("");
		}
	};

	// Conditionally set status of button
	const allowPost = (): boolean => {
		if (
			fName.length < 2 ||
			!email.includes("@") ||
			!email.includes(".com") ||
			message.length < 2
		) {
			return true;
		} else {
			return false;
		}
	};

	function sendEmail(e: any) {
		e.preventDefault();

		emailjs
			.sendForm(
				"service_d3athxx",
				"template_e1h4es6",
				e.target,
				"user_McluR2AIEQNtd0q0ilNGC"
			)
			.then(
				(result) => {
					console.log(result.text);
				},
				(error) => {
					console.log(error.text);
					setEmailMsg(
						"That's strange, your email did not go through"
					);
				}
			);
		e.target.reset();
		setEmailMsg("Cheers!");
	}

	return (
		<div className="py-4">
			<h5 className="py-4 text-lg font-bold" id="contact">
				Say hi
			</h5>
			<form onSubmit={sendEmail}>
				<input
					className="w-full h-9 p-2 mb-2 border-2 border-gray-800 rounded-md text-gray-600"
					value={fName}
					onChange={(e) => {
						setfName(e.target.value);
					}}
					onBlur={validatefName}
					placeholder="Name"
					name="fName"
					required={true}
				/>
				{fNameErr}
				<input
					className="w-full h-9 p-2 mb-2 border-2 border-gray-800 rounded-md text-gray-600"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					onBlur={validateEmail}
					placeholder="Email"
					name="email"
					required={true}
				/>
				{emailErr}
				<textarea
					className="w-full h-14 p-2 mb-2 border-2 border-gray-800 rounded-md text-gray-600"
					value={message}
					onChange={(e) => {
						setMessage(e.target.value);
					}}
					onBlur={validateMessage}
					placeholder="Message"
					name="message"
					required={true}
				/>
				{messageErr}
				<button
					className="w-auto h-auto rounded-md p-2 my-2 bg-gray-200 border-2 border-gray-800 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-400"
					disabled={allowPost()}
					type="submit"
				>
					Submit
				</button>
				<p> {emailMsg}</p>
			</form>
		</div>
	);
};

export default Contact;
