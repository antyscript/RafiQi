import { Link } from "react-router-dom";

function CalculPage() {
	return (
		<>
			<div className="calculate" style={{ direction: "rtl" }}>
				<h2>مرحبا بك في موقعنا !</h2>
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
				</div>
				<p>
					ان كانت عملية الحساب غير مرضية او لديك شكوك يرجى تفقد قسم
					حول للاطلاع على التفاصيل
				</p>
			</div>
		</>
	);
}

export default CalculPage;
