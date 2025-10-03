import { Link } from "react-router-dom";
import SplitText from "./SplitText";

const handleAnimationComplete = () => {
	console.log("All letters have animated!");
};

function CalculPage() {
	return (
		<>
			<div className="calculate" style={{ direction: "rtl" }}>
				<div
					style={{
						fontSize: "1.5rem",
						fontWeight: "900",
						margin: "16px auto"
					}}
				>
					<SplitText
						text="مرحبا بك في موقعنا !"
						className="text-2xl font-semibold text-center"
						delay={100}
						duration={0.8}
						ease="power3.out"
						splitType="chars"
						from={{ opacity: 0, y: 40 }}
						to={{ opacity: 1, y: 0 }}
						threshold={0.1}
						rootMargin="-100px"
						textAlign="center"
						onLetterAnimationComplete={handleAnimationComplete}
					/>
				</div>
				<p>
					يمكنك اختيار مستواك الدراسي وحساب معدلك او نتيجتك الدراسية
					بسهولة، ما عليك الا اختيار احد هاته الخيارات، وان لم يكن
					مستواك متوفرا يرجى دعمنا وابلاغنا برغبتك به وسنضيفه ان شاء
					الله
				</p>
				<div>
					<Link to="/note/tcsf">
						<button>TCSF</button>
					</Link>
					<Link to="/note/tcal">
						<button>TCAL</button>
					</Link>
					<Link to="/note/1bac-scexp">
						<button>1BAC-SCEXP</button>
					</Link>
					<Link to="/note/1bac-lsh">
						<button>1BAC-LSH</button>
					</Link>
					<Link to="/note/2bac-pc">
						<button>2BAC-PC</button>
					</Link>
					<Link to="/note/2bac-sh">
						<button>2BAC-SH</button>
					</Link>
					<Link to="/note/tas3a">
						<button
							style={{
								direction: "ltr",
								width: "93%"
							}}
						>
							3 ANNEE-COLLEGE
						</button>
					</Link>
				</div>
				<p>
					ان كانت عملية الحساب غير مرضية او لديك شكوك يرجى تفقد قسم
					حول للاطلاع على التفاصيل
				</p>
			</div>

			<div
				style={{ width: "100%", height: "600px", position: "relative" }}
			></div>
		</>
	);
}

export default CalculPage;
