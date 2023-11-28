import React, { useState, useEffect } from 'react';

function TypewriterEffect({ text }) {
	const [displayText, setDisplayText] = useState('');
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			if (index < text.length) {
				setDisplayText((prevText) => prevText + text.charAt(index));
				setIndex((prevIndex) => prevIndex + 1);
			}
		}, 5);

		return () => {
			clearInterval(timer);
		};
	}, [index, text]);

	return <div>{displayText}</div>;
}
const MarketingAngleForm = () => {
	const [responseText, setResponseText] = useState('');
	const [loading, setloading] = useState(false)
	const [formData, setFormData] = useState({
		productName: 'Eco-Friendly Water Bottle',
		productDescription:
			'A 500ml reusable water bottle made from sustainable materials, featuring a leak-proof design and thermal insulation.',
		targetAudience:
			'Environmentally conscious consumers, outdoor enthusiasts, and urban commuters.',
		toneOfVoice: 'Friendly, informative, and inspiring.',
		brandIdentity: 'Eco-friendly, innovative, and reliable.',
		competitiveLandscape:
			'Competes with other sustainable lifestyle brands, focusing on durability and design.',
		pricePoint: 'Mid-range, offering good value for eco-conscious products.',
		distributionChannels: 'Online retail, eco-friendly stores, and outdoor equipment shops.',
		visualElements: 'Natural colors, clean design, and imagery reflecting an eco-friendly lifestyle.',
		desiredAction: 'Encourage purchase through highlighting environmental impact and product features.',
		legalComplianceInfo:
			'Complies with all applicable environmental and safety regulations. BPA-free and FDA approved materials.',
		culturalSensitivities:
			'Inclusive marketing that respects cultural differences and promotes sustainability universally.',
	});


	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setloading(true);
		try {
			const response = await fetch('https://sk8j9bpvmh84p0lo6brcg0cdag.ingress.spheron.wiki/chat', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});
			const data = await response.json();
			console.log(data.response.content); // Process the response data as needed
			setloading(false);
			setResponseText(data.response.content)

		} catch (error) {
			console.error('Error during API request:', error);
		}
	};

	return (
		<div>
			<div className="flex justify-center items-center h-screen bg-gray-100">
				<form onSubmit={handleSubmit} className="w-full max-w-4xl bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
					<div className="grid grid-cols-2 gap-4">
						{Object.keys(formData).map((key, index) => (
							<div key={index} className="mb-4">
								<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={key}>
									{key.split(/(?=[A-Z])/).join(" ")}
								</label>
								<input
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									name={key}
									type="text"
									placeholder={key}
									value={formData[key]}
									onChange={handleChange}
								/>
							</div>
						))}
					</div>
					<div className="flex items-center justify-center mt-6">
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
							Generate Marketing Angle
						</button>
					</div>
				</form>
			</div>
			<div className="flex justify-center items-center h-screen bg-gray-100">
				{loading ? (
					<div>Loading...</div> // Loading message
				) : (
					responseText && <TypewriterEffect text={responseText} />
				)}
			</div>
		</div>
	);
}

export default MarketingAngleForm;
