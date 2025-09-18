import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Profiles() {
	const { user } = useParams();
	const [profile, setProfile] = useState(null);
	const [error, setError] = useState(null);

/*	useEffect(() => {
		fetch(`http://localhost:5000/usersprofile/${user}`)
			.then(res => res.json())
			.then(response => {
				setProfile(response);
			})
			.catch(() => {
				setError(
					`حصل خطأ في البحث عن المستخدم ${user}، جرب التحقق من الاتصال واذا استمرت المشكلة راسل المطور`
				);
			});
	}, [user]);

	if (error) return <div style={{ direction: "rtl" }}>{error}</div>;

	if (!profile) return <div>Loading...</div>;

	if (profile.isExist) {
		return <div>Hello, this is {profile.isExist}</div>;
	}

	if (profile.NotExist) {
		return <div>This user does not exist: {profile.NotExist}</div>;
	}

	return <div>No data found</div>;
	*/
	return <div>{user}</div>
}
