import React from 'react';
import { CoverImage, Heading, LinkButton } from './index.ts';

const CoverSection = () => {
	return (
		<section>
			<div className="relative flex items-center justify-center">
				<div className="relative">
					<div role="img" className="img-gradient absolute inset-0"></div>
					<CoverImage />
				</div>

				<div className="absolute top-1/2 left-[10%] -translate-y-1/2">
					<Heading type="h1" bold={true} className="text-text-on-primary mb-4">
						60 all-time <br /> dinner recipes
					</Heading>
					<LinkButton to="recipes" type="primary">
						SEE THEM ALL
					</LinkButton>
				</div>
			</div>
		</section>
	);
};

export default CoverSection;
