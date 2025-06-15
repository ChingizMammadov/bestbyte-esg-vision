
import React from 'react';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContactInformationSectionProps {
  control: Control<any>;
  watchedCountryId: string;
  isCountryPopoverOpen: boolean;
  setCountryPopoverOpen: (open: boolean) => void;
}

const countries = [
  { id: "AF", code: "+93", name: "Afghanistan" },
  { id: "AL", code: "+355", name: "Albania" },
  { id: "DZ", code: "+213", name: "Algeria" },
  { id: "AD", code: "+376", name: "Andorra" },
  { id: "AO", code: "+244", name: "Angola" },
  { id: "AG", code: "+1", name: "Antigua and Barbuda" },
  { id: "AR", code: "+54", name: "Argentina" },
  { id: "AM", code: "+374", name: "Armenia" },
  { id: "AU", code: "+61", name: "Australia" },
  { id: "AT", code: "+43", name: "Austria" },
  { id: "AZ", code: "+994", name: "Azerbaijan" },
  { id: "BS", code: "+1", name: "Bahamas" },
  { id: "BH", code: "+973", name: "Bahrain" },
  { id: "BD", code: "+880", name: "Bangladesh" },
  { id: "BB", code: "+1", name: "Barbados" },
  { id: "BY", code: "+375", name: "Belarus" },
  { id: "BE", code: "+32", name: "Belgium" },
  { id: "BZ", code: "+501", name: "Belize" },
  { id: "BJ", code: "+229", name: "Benin" },
  { id: "BM", code: "+1", name: "Bermuda" },
  { id: "BT", code: "+975", name: "Bhutan" },
  { id: "BO", code: "+591", name: "Bolivia" },
  { id: "BA", code: "+387", name: "Bosnia and Herzegovina" },
  { id: "BW", code: "+267", name: "Botswana" },
  { id: "BR", code: "+55", name: "Brazil" },
  { id: "BN", code: "+673", name: "Brunei" },
  { id: "BG", code: "+359", name: "Bulgaria" },
  { id: "BF", code: "+226", name: "Burkina Faso" },
  { id: "BI", code: "+257", name: "Burundi" },
  { id: "KH", code: "+855", name: "Cambodia" },
  { id: "CM", code: "+237", name: "Cameroon" },
  { id: "CA", code: "+1", name: "Canada" },
  { id: "CV", code: "+238", name: "Cape Verde" },
  { id: "KY", code: "+1", name: "Cayman Islands" },
  { id: "CF", code: "+236", name: "Central African Republic" },
  { id: "TD", code: "+235", name: "Chad" },
  { id: "CL", code: "+56", name: "Chile" },
  { id: "CN", code: "+86", name: "China" },
  { id: "CO", code: "+57", name: "Colombia" },
  { id: "KM", code: "+269", name: "Comoros" },
  { id: "CG", code: "+242", name: "Congo" },
  { id: "CR", code: "+506", name: "Costa Rica" },
  { id: "HR", code: "+385", name: "Croatia" },
  { id: "CU", code: "+53", name: "Cuba" },
  { id: "CW", code: "+599", name: "Curacao" },
  { id: "CY", code: "+357", name: "Cyprus" },
  { id: "CZ", code: "+420", name: "Czech Republic" },
  { id: "DK", code: "+45", name: "Denmark" },
  { id: "DJ", code: "+253", name: "Djibouti" },
  { id: "DM", code: "+1", name: "Dominica" },
  { id: "DO", code: "+1", name: "Dominican Republic" },
  { id: "TL", code: "+670", name: "East Timor" },
  { id: "EC", code: "+593", name: "Ecuador" },
  { id: "EG", code: "+20", name: "Egypt" },
  { id: "SV", code: "+503", name: "El Salvador" },
  { id: "GQ", code: "+240", name: "Equatorial Guinea" },
  { id: "ER", code: "+291", name: "Eritrea" },
  { id: "EE", code: "+372", name: "Estonia" },
  { id: "ET", code: "+251", name: "Ethiopia" },
  { id: "FK", code: "+500", name: "Falkland Islands" },
  { id: "FO", code: "+298", name: "Faroe Islands" },
  { id: "FJ", code: "+679", name: "Fiji" },
  { id: "FI", code: "+358", name: "Finland" },
  { id: "FR", code: "+33", name: "France" },
  { id: "GA", code: "+241", name: "Gabon" },
  { id: "GM", code: "+220", name: "Gambia" },
  { id: "GE", code: "+995", name: "Georgia" },
  { id: "DE", code: "+49", name: "Germany" },
  { id: "GH", code: "+233", name: "Ghana" },
  { id: "GI", code: "+350", name: "Gibraltar" },
  { id: "GR", code: "+30", name: "Greece" },
  { id: "GL", code: "+299", name: "Greenland" },
  { id: "GD", code: "+1", name: "Grenada" },
  { id: "GU", code: "+1", name: "Guam" },
  { id: "GT", code: "+502", name: "Guatemala" },
  { id: "GN", code: "+224", name: "Guinea" },
  { id: "GW", code: "+245", name: "Guinea-Bissau" },
  { id: "GY", code: "+592", name: "Guyana" },
  { id: "HT", code: "+509", name: "Haiti" },
  { id: "HN", code: "+504", name: "Honduras" },
  { id: "HK", code: "+852", name: "Hong Kong" },
  { id: "HU", code: "+36", name: "Hungary" },
  { id: "IS", code: "+354", name: "Iceland" },
  { id: "IN", code: "+91", name: "India" },
  { id: "ID", code: "+62", name: "Indonesia" },
  { id: "IR", code: "+98", name: "Iran" },
  { id: "IQ", code: "+964", name: "Iraq" },
  { id: "IE", code: "+353", name: "Ireland" },
  { id: "IL", code: "+972", name: "Israel" },
  { id: "IT", code: "+39", name: "Italy" },
  { id: "JM", code: "+1", name: "Jamaica" },
  { id: "JP", code: "+81", name: "Japan" },
  { id: "JO", code: "+962", name: "Jordan" },
  { id: "KZ", code: "+7", name: "Kazakhstan" },
  { id: "KE", code: "+254", name: "Kenya" },
  { id: "KI", code: "+686", name: "Kiribati" },
  { id: "KW", code: "+965", name: "Kuwait" },
  { id: "KG", code: "+996", name: "Kyrgyzstan" },
  { id: "LA", code: "+856", name: "Laos" },
  { id: "LV", code: "+371", name: "Latvia" },
  { id: "LB", code: "+961", name: "Lebanon" },
  { id: "LS", code: "+266", name: "Lesotho" },
  { id: "LR", code: "+231", name: "Liberia" },
  { id: "LY", code: "+218", name: "Libya" },
  { id: "LI", code: "+423", name: "Liechtenstein" },
  { id: "LT", code: "+370", name: "Lithuania" },
  { id: "LU", code: "+352", name: "Luxembourg" },
  { id: "MO", code: "+853", name: "Macao" },
  { id: "MK", code: "+389", name: "Macedonia" },
  { id: "MG", code: "+261", name: "Madagascar" },
  { id: "MW", code: "+265", name: "Malawi" },
  { id: "MY", code: "+60", name: "Malaysia" },
  { id: "MV", code: "+960", name: "Maldives" },
  { id: "ML", code: "+223", name: "Mali" },
  { id: "MT", code: "+356", name: "Malta" },
  { id: "MH", code: "+692", name: "Marshall Islands" },
  { id: "MQ", code: "+596", name: "Martinique" },
  { id: "MR", code: "+222", name: "Mauritania" },
  { id: "MU", code: "+230", name: "Mauritius" },
  { id: "MX", code: "+52", name: "Mexico" },
  { id: "FM", code: "+691", name: "Micronesia" },
  { id: "MD", code: "+373", name: "Moldova" },
  { id: "MC", code: "+377", name: "Monaco" },
  { id: "MN", code: "+976", name: "Mongolia" },
  { id: "ME", code: "+382", name: "Montenegro" },
  { id: "MS", code: "+1", name: "Montserrat" },
  { id: "MA", code: "+212", name: "Morocco" },
  { id: "MZ", code: "+258", name: "Mozambique" },
  { id: "MM", code: "+95", name: "Myanmar" },
  { id: "NA", code: "+264", name: "Namibia" },
  { id: "NR", code: "+674", name: "Nauru" },
  { id: "NP", code: "+977", name: "Nepal" },
  { id: "NL", code: "+31", name: "Netherlands" },
  { id: "KN", code: "+1", name: "Nevis" },
  { id: "NC", code: "+687", name: "New Caledonia" },
  { id: "NZ", code: "+64", name: "New Zealand" },
  { id: "NI", code: "+505", name: "Nicaragua" },
  { id: "NE", code: "+227", name: "Niger" },
  { id: "NG", code: "+234", name: "Nigeria" },
  { id: "NU", code: "+683", name: "Niue" },
  { id: "NF", code: "+672", name: "Norfolk Island" },
  { id: "MP", code: "+1", name: "Northern Mariana Islands" },
  { id: "NO", code: "+47", name: "Norway" },
  { id: "OM", code: "+968", name: "Oman" },
  { id: "PK", code: "+92", name: "Pakistan" },
  { id: "PW", code: "+680", name: "Palau" },
  { id: "PS", code: "+970", name: "Palestine" },
  { id: "PA", code: "+507", name: "Panama" },
  { id: "PG", code: "+675", name: "Papua New Guinea" },
  { id: "PY", code: "+595", name: "Paraguay" },
  { id: "PE", code: "+51", name: "Peru" },
  { id: "PH", code: "+63", name: "Philippines" },
  { id: "PN", code: "+64", name: "Pitcairn Islands" },
  { id: "PL", code: "+48", name: "Poland" },
  { id: "PT", code: "+351", name: "Portugal" },
  { id: "PR", code: "+1", name: "Puerto Rico" },
  { id: "QA", code: "+974", name: "Qatar" },
  { id: "RO", code: "+40", name: "Romania" },
  { id: "RU", code: "+7", name: "Russia" },
  { id: "RW", code: "+250", name: "Rwanda" },
  { id: "WS", code: "+685", name: "Samoa" },
  { id: "SM", code: "+378", name: "San Marino" },
  { id: "ST", code: "+239", name: "Sao Tome and Principe" },
  { id: "SA", code: "+966", name: "Saudi Arabia" },
  { id: "SN", code: "+221", name: "Senegal" },
  { id: "RS", code: "+381", name: "Serbia" },
  { id: "SC", code: "+248", name: "Seychelles" },
  { id: "SL", code: "+232", name: "Sierra Leone" },
  { id: "SG", code: "+65", name: "Singapore" },
  { id: "SK", code: "+421", name: "Slovakia" },
  { id: "SI", code: "+386", name: "Slovenia" },
  { id: "SB", code: "+677", name: "Solomon Islands" },
  { id: "SO", code: "+252", name: "Somalia" },
  { id: "ZA", code: "+27", name: "South Africa" },
  { id: "KR", code: "+82", name: "South Korea" },
  { id: "SS", code: "+211", name: "South Sudan" },
  { id: "ES", code: "+34", name: "Spain" },
  { id: "LK", code: "+94", name: "Sri Lanka" },
  { id: "SD", code: "+249", name: "Sudan" },
  { id: "SR", code: "+597", name: "Suriname" },
  { id: "SJ", code: "+47", name: "Svalbard" },
  { id: "SZ", code: "+268", name: "Swaziland" },
  { id: "SE", code: "+46", name: "Sweden" },
  { id: "CH", code: "+41", name: "Switzerland" },
  { id: "SY", code: "+963", name: "Syria" },
  { id: "TW", code: "+886", name: "Taiwan" },
  { id: "TJ", code: "+992", name: "Tajikistan" },
  { id: "TZ", code: "+255", name: "Tanzania" },
  { id: "TH", code: "+66", name: "Thailand" },
  { id: "TG", code: "+228", name: "Togo" },
  { id: "TK", code: "+690", name: "Tokelau" },
  { id: "TO", code: "+676", name: "Tonga" },
  { id: "TT", code: "+1", name: "Trinidad and Tobago" },
  { id: "TN", code: "+216", name: "Tunisia" },
  { id: "TR", code: "+90", name: "Turkey" },
  { id: "TM", code: "+993", name: "Turkmenistan" },
  { id: "TC", code: "+1", name: "Turks and Caicos Islands" },
  { id: "TV", code: "+688", name: "Tuvalu" },
  { id: "UG", code: "+256", name: "Uganda" },
  { id: "UA", code: "+380", name: "Ukraine" },
  { id: "AE", code: "+971", name: "United Arab Emirates" },
  { id: "GB", code: "+44", name: "United Kingdom" },
  { id: "US", code: "+1", name: "United States" },
  { id: "UY", code: "+598", name: "Uruguay" },
  { id: "UZ", code: "+998", name: "Uzbekistan" },
  { id: "VU", code: "+678", name: "Vanuatu" },
  { id: "VE", code: "+58", name: "Venezuela" },
  { id: "VN", code: "+84", name: "Vietnam" },
  { id: "WF", code: "+681", name: "Wallis and Futuna" },
  { id: "EH", code: "+212", name: "Western Sahara" },
  { id: "YE", code: "+967", name: "Yemen" },
  { id: "ZM", code: "+260", name: "Zambia" },
  { id: "ZW", code: "+263", name: "Zimbabwe" }
];

export function ContactInformationSection({ 
  control, 
  watchedCountryId, 
  isCountryPopoverOpen, 
  setCountryPopoverOpen 
}: ContactInformationSectionProps) {
  const selectedCountry = countries.find(country => country.id === watchedCountryId);

  return (
    <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Contact Information</h3>
      
      <FormField 
        control={control} 
        name="email" 
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email Address *</FormLabel>
            <FormControl>
              <Input 
                type="email" 
                placeholder="yourname@company.com" 
                {...field} 
                autoComplete="email" 
                inputMode="email" 
                className="text-sm h-11 md:h-10" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} 
      />

      <div className="space-y-2">
        <FormLabel>Phone Number (Optional)</FormLabel>
        <div className="grid grid-cols-[110px_1fr] gap-2">
          <FormField 
            control={control} 
            name="countryId" 
            render={({ field }) => (
              <FormItem>
                <Popover open={isCountryPopoverOpen} onOpenChange={setCountryPopoverOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between h-11 md:h-10 text-sm px-2"
                      >
                        <span className="truncate">
                          {selectedCountry?.code || "+1"}
                        </span>
                        <ChevronsUpDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[320px] p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search country..." className="text-sm" />
                      <CommandList>
                        <CommandEmpty>No country found.</CommandEmpty>
                        <CommandGroup>
                          {countries.map((country) => (
                            <CommandItem
                              value={`${country.name} ${country.code}`}
                              key={country.id}
                              onSelect={() => {
                                field.onChange(country.id);
                                setCountryPopoverOpen(false);
                              }}
                              className="text-sm"
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  country.id === watchedCountryId ? "opacity-100" : "opacity-0"
                                )}
                              />
                              <span className="flex-1">{country.name}</span>
                              <span className="text-muted-foreground">{country.code}</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )} 
          />

          <FormField 
            control={control} 
            name="phone" 
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    type="tel" 
                    placeholder="Phone number" 
                    {...field} 
                    autoComplete="tel" 
                    inputMode="tel" 
                    className="text-sm h-11 md:h-10" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} 
          />
        </div>
      </div>
    </div>
  );
}
