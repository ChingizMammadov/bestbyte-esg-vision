
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
  { id: "AF", code: "+93", name: "Afghanistan", flag: "🇦🇫" },
  { id: "AL", code: "+355", name: "Albania", flag: "🇦🇱" },
  { id: "DZ", code: "+213", name: "Algeria", flag: "🇩🇿" },
  { id: "AD", code: "+376", name: "Andorra", flag: "🇦🇩" },
  { id: "AO", code: "+244", name: "Angola", flag: "🇦🇴" },
  { id: "AG", code: "+1", name: "Antigua and Barbuda", flag: "🇦🇬" },
  { id: "AR", code: "+54", name: "Argentina", flag: "🇦🇷" },
  { id: "AM", code: "+374", name: "Armenia", flag: "🇦🇲" },
  { id: "AU", code: "+61", name: "Australia", flag: "🇦🇺" },
  { id: "AT", code: "+43", name: "Austria", flag: "🇦🇹" },
  { id: "AZ", code: "+994", name: "Azerbaijan", flag: "🇦🇿" },
  { id: "BS", code: "+1", name: "Bahamas", flag: "🇧🇸" },
  { id: "BH", code: "+973", name: "Bahrain", flag: "🇧🇭" },
  { id: "BD", code: "+880", name: "Bangladesh", flag: "🇧🇩" },
  { id: "BB", code: "+1", name: "Barbados", flag: "🇧🇧" },
  { id: "BY", code: "+375", name: "Belarus", flag: "🇧🇾" },
  { id: "BE", code: "+32", name: "Belgium", flag: "🇧🇪" },
  { id: "BZ", code: "+501", name: "Belize", flag: "🇧🇿" },
  { id: "BJ", code: "+229", name: "Benin", flag: "🇧🇯" },
  { id: "BM", code: "+1", name: "Bermuda", flag: "🇧🇲" },
  { id: "BT", code: "+975", name: "Bhutan", flag: "🇧🇹" },
  { id: "BO", code: "+591", name: "Bolivia", flag: "🇧🇴" },
  { id: "BA", code: "+387", name: "Bosnia and Herzegovina", flag: "🇧🇦" },
  { id: "BW", code: "+267", name: "Botswana", flag: "🇧🇼" },
  { id: "BR", code: "+55", name: "Brazil", flag: "🇧🇷" },
  { id: "BN", code: "+673", name: "Brunei", flag: "🇧🇳" },
  { id: "BG", code: "+359", name: "Bulgaria", flag: "🇧🇬" },
  { id: "BF", code: "+226", name: "Burkina Faso", flag: "🇧🇫" },
  { id: "BI", code: "+257", name: "Burundi", flag: "🇧🇮" },
  { id: "KH", code: "+855", name: "Cambodia", flag: "🇰🇭" },
  { id: "CM", code: "+237", name: "Cameroon", flag: "🇨🇲" },
  { id: "CA", code: "+1", name: "Canada", flag: "🇨🇦" },
  { id: "CV", code: "+238", name: "Cape Verde", flag: "🇨🇻" },
  { id: "KY", code: "+1", name: "Cayman Islands", flag: "🇰🇾" },
  { id: "CF", code: "+236", name: "Central African Republic", flag: "🇨🇫" },
  { id: "TD", code: "+235", name: "Chad", flag: "🇹🇩" },
  { id: "CL", code: "+56", name: "Chile", flag: "🇨🇱" },
  { id: "CN", code: "+86", name: "China", flag: "🇨🇳" },
  { id: "CO", code: "+57", name: "Colombia", flag: "🇨🇴" },
  { id: "KM", code: "+269", name: "Comoros", flag: "🇰🇲" },
  { id: "CG", code: "+242", name: "Congo", flag: "🇨🇬" },
  { id: "CR", code: "+506", name: "Costa Rica", flag: "🇨🇷" },
  { id: "HR", code: "+385", name: "Croatia", flag: "🇭🇷" },
  { id: "CU", code: "+53", name: "Cuba", flag: "🇨🇺" },
  { id: "CW", code: "+599", name: "Curacao", flag: "🇨🇼" },
  { id: "CY", code: "+357", name: "Cyprus", flag: "🇨🇾" },
  { id: "CZ", code: "+420", name: "Czech Republic", flag: "🇨🇿" },
  { id: "DK", code: "+45", name: "Denmark", flag: "🇩🇰" },
  { id: "DJ", code: "+253", name: "Djibouti", flag: "🇩🇯" },
  { id: "DM", code: "+1", name: "Dominica", flag: "🇩🇲" },
  { id: "DO", code: "+1", name: "Dominican Republic", flag: "🇩🇴" },
  { id: "TL", code: "+670", name: "East Timor", flag: "🇹🇱" },
  { id: "EC", code: "+593", name: "Ecuador", flag: "🇪🇨" },
  { id: "EG", code: "+20", name: "Egypt", flag: "🇪🇬" },
  { id: "SV", code: "+503", name: "El Salvador", flag: "🇸🇻" },
  { id: "GQ", code: "+240", name: "Equatorial Guinea", flag: "🇬🇶" },
  { id: "ER", code: "+291", name: "Eritrea", flag: "🇪🇷" },
  { id: "EE", code: "+372", name: "Estonia", flag: "🇪🇪" },
  { id: "ET", code: "+251", name: "Ethiopia", flag: "🇪🇹" },
  { id: "FK", code: "+500", name: "Falkland Islands", flag: "🇫🇰" },
  { id: "FO", code: "+298", name: "Faroe Islands", flag: "🇫🇴" },
  { id: "FJ", code: "+679", name: "Fiji", flag: "🇫🇯" },
  { id: "FI", code: "+358", name: "Finland", flag: "🇫🇮" },
  { id: "FR", code: "+33", name: "France", flag: "🇫🇷" },
  { id: "GA", code: "+241", name: "Gabon", flag: "🇬🇦" },
  { id: "GM", code: "+220", name: "Gambia", flag: "🇬🇲" },
  { id: "GE", code: "+995", name: "Georgia", flag: "🇬🇪" },
  { id: "DE", code: "+49", name: "Germany", flag: "🇩🇪" },
  { id: "GH", code: "+233", name: "Ghana", flag: "🇬🇭" },
  { id: "GI", code: "+350", name: "Gibraltar", flag: "🇬🇮" },
  { id: "GR", code: "+30", name: "Greece", flag: "🇬🇷" },
  { id: "GL", code: "+299", name: "Greenland", flag: "🇬🇱" },
  { id: "GD", code: "+1", name: "Grenada", flag: "🇬🇩" },
  { id: "GU", code: "+1", name: "Guam", flag: "🇬🇺" },
  { id: "GT", code: "+502", name: "Guatemala", flag: "🇬🇹" },
  { id: "GN", code: "+224", name: "Guinea", flag: "🇬🇳" },
  { id: "GW", code: "+245", name: "Guinea-Bissau", flag: "🇬🇼" },
  { id: "GY", code: "+592", name: "Guyana", flag: "🇬🇾" },
  { id: "HT", code: "+509", name: "Haiti", flag: "🇭🇹" },
  { id: "HN", code: "+504", name: "Honduras", flag: "🇭🇳" },
  { id: "HK", code: "+852", name: "Hong Kong", flag: "🇭🇰" },
  { id: "HU", code: "+36", name: "Hungary", flag: "🇭🇺" },
  { id: "IS", code: "+354", name: "Iceland", flag: "🇮🇸" },
  { id: "IN", code: "+91", name: "India", flag: "🇮🇳" },
  { id: "ID", code: "+62", name: "Indonesia", flag: "🇮🇩" },
  { id: "IR", code: "+98", name: "Iran", flag: "🇮🇷" },
  { id: "IQ", code: "+964", name: "Iraq", flag: "🇮🇶" },
  { id: "IE", code: "+353", name: "Ireland", flag: "🇮🇪" },
  { id: "IL", code: "+972", name: "Israel", flag: "🇮🇱" },
  { id: "IT", code: "+39", name: "Italy", flag: "🇮🇹" },
  { id: "JM", code: "+1", name: "Jamaica", flag: "🇯🇲" },
  { id: "JP", code: "+81", name: "Japan", flag: "🇯🇵" },
  { id: "JO", code: "+962", name: "Jordan", flag: "🇯🇴" },
  { id: "KZ", code: "+7", name: "Kazakhstan", flag: "🇰🇿" },
  { id: "KE", code: "+254", name: "Kenya", flag: "🇰🇪" },
  { id: "KI", code: "+686", name: "Kiribati", flag: "🇰🇮" },
  { id: "KW", code: "+965", name: "Kuwait", flag: "🇰🇼" },
  { id: "KG", code: "+996", name: "Kyrgyzstan", flag: "🇰🇬" },
  { id: "LA", code: "+856", name: "Laos", flag: "🇱🇦" },
  { id: "LV", code: "+371", name: "Latvia", flag: "🇱🇻" },
  { id: "LB", code: "+961", name: "Lebanon", flag: "🇱🇧" },
  { id: "LS", code: "+266", name: "Lesotho", flag: "🇱🇸" },
  { id: "LR", code: "+231", name: "Liberia", flag: "🇱🇷" },
  { id: "LY", code: "+218", name: "Libya", flag: "🇱🇾" },
  { id: "LI", code: "+423", name: "Liechtenstein", flag: "🇱🇮" },
  { id: "LT", code: "+370", name: "Lithuania", flag: "🇱🇹" },
  { id: "LU", code: "+352", name: "Luxembourg", flag: "🇱🇺" },
  { id: "MO", code: "+853", name: "Macao", flag: "🇲🇴" },
  { id: "MK", code: "+389", name: "Macedonia", flag: "🇲🇰" },
  { id: "MG", code: "+261", name: "Madagascar", flag: "🇲🇬" },
  { id: "MW", code: "+265", name: "Malawi", flag: "🇲🇼" },
  { id: "MY", code: "+60", name: "Malaysia", flag: "🇲🇾" },
  { id: "MV", code: "+960", name: "Maldives", flag: "🇲🇻" },
  { id: "ML", code: "+223", name: "Mali", flag: "🇲🇱" },
  { id: "MT", code: "+356", name: "Malta", flag: "🇲🇹" },
  { id: "MH", code: "+692", name: "Marshall Islands", flag: "🇲🇭" },
  { id: "MQ", code: "+596", name: "Martinique", flag: "🇲🇶" },
  { id: "MR", code: "+222", name: "Mauritania", flag: "🇲🇷" },
  { id: "MU", code: "+230", name: "Mauritius", flag: "🇲🇺" },
  { id: "MX", code: "+52", name: "Mexico", flag: "🇲🇽" },
  { id: "FM", code: "+691", name: "Micronesia", flag: "🇫🇲" },
  { id: "MD", code: "+373", name: "Moldova", flag: "🇲🇩" },
  { id: "MC", code: "+377", name: "Monaco", flag: "🇲🇨" },
  { id: "MN", code: "+976", name: "Mongolia", flag: "🇲🇳" },
  { id: "ME", code: "+382", name: "Montenegro", flag: "🇲🇪" },
  { id: "MS", code: "+1", name: "Montserrat", flag: "🇲🇸" },
  { id: "MA", code: "+212", name: "Morocco", flag: "🇲🇦" },
  { id: "MZ", code: "+258", name: "Mozambique", flag: "🇲🇿" },
  { id: "MM", code: "+95", name: "Myanmar", flag: "🇲🇲" },
  { id: "NA", code: "+264", name: "Namibia", flag: "🇳🇦" },
  { id: "NR", code: "+674", name: "Nauru", flag: "🇳🇷" },
  { id: "NP", code: "+977", name: "Nepal", flag: "🇳🇵" },
  { id: "NL", code: "+31", name: "Netherlands", flag: "🇳🇱" },
  { id: "KN", code: "+1", name: "Nevis", flag: "🇰🇳" },
  { id: "NC", code: "+687", name: "New Caledonia", flag: "🇳🇨" },
  { id: "NZ", code: "+64", name: "New Zealand", flag: "🇳🇿" },
  { id: "NI", code: "+505", name: "Nicaragua", flag: "🇳🇮" },
  { id: "NE", code: "+227", name: "Niger", flag: "🇳🇪" },
  { id: "NG", code: "+234", name: "Nigeria", flag: "🇳🇬" },
  { id: "NU", code: "+683", name: "Niue", flag: "🇳🇺" },
  { id: "NF", code: "+672", name: "Norfolk Island", flag: "🇳🇫" },
  { id: "MP", code: "+1", name: "Northern Mariana Islands", flag: "🇲🇵" },
  { id: "NO", code: "+47", name: "Norway", flag: "🇳🇴" },
  { id: "OM", code: "+968", name: "Oman", flag: "🇴🇲" },
  { id: "PK", code: "+92", name: "Pakistan", flag: "🇵🇰" },
  { id: "PW", code: "+680", name: "Palau", flag: "🇵🇼" },
  { id: "PS", code: "+970", name: "Palestine", flag: "🇵🇸" },
  { id: "PA", code: "+507", name: "Panama", flag: "🇵🇦" },
  { id: "PG", code: "+675", name: "Papua New Guinea", flag: "🇵🇬" },
  { id: "PY", code: "+595", name: "Paraguay", flag: "🇵🇾" },
  { id: "PE", code: "+51", name: "Peru", flag: "🇵🇪" },
  { id: "PH", code: "+63", name: "Philippines", flag: "🇵🇭" },
  { id: "PN", code: "+64", name: "Pitcairn Islands", flag: "🇵🇳" },
  { id: "PL", code: "+48", name: "Poland", flag: "🇵🇱" },
  { id: "PT", code: "+351", name: "Portugal", flag: "🇵🇹" },
  { id: "PR", code: "+1", name: "Puerto Rico", flag: "🇵🇷" },
  { id: "QA", code: "+974", name: "Qatar", flag: "🇶🇦" },
  { id: "RO", code: "+40", name: "Romania", flag: "🇷🇴" },
  { id: "RU", code: "+7", name: "Russia", flag: "🇷🇺" },
  { id: "RW", code: "+250", name: "Rwanda", flag: "🇷🇼" },
  { id: "WS", code: "+685", name: "Samoa", flag: "🇼🇸" },
  { id: "SM", code: "+378", name: "San Marino", flag: "🇸🇲" },
  { id: "ST", code: "+239", name: "Sao Tome and Principe", flag: "🇸🇹" },
  { id: "SA", code: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
  { id: "SN", code: "+221", name: "Senegal", flag: "🇸🇳" },
  { id: "RS", code: "+381", name: "Serbia", flag: "🇷🇸" },
  { id: "SC", code: "+248", name: "Seychelles", flag: "🇸🇨" },
  { id: "SL", code: "+232", name: "Sierra Leone", flag: "🇸🇱" },
  { id: "SG", code: "+65", name: "Singapore", flag: "🇸🇬" },
  { id: "SK", code: "+421", name: "Slovakia", flag: "🇸🇰" },
  { id: "SI", code: "+386", name: "Slovenia", flag: "🇸🇮" },
  { id: "SB", code: "+677", name: "Solomon Islands", flag: "🇸🇧" },
  { id: "SO", code: "+252", name: "Somalia", flag: "🇸🇴" },
  { id: "ZA", code: "+27", name: "South Africa", flag: "🇿🇦" },
  { id: "KR", code: "+82", name: "South Korea", flag: "🇰🇷" },
  { id: "SS", code: "+211", name: "South Sudan", flag: "🇸🇸" },
  { id: "ES", code: "+34", name: "Spain", flag: "🇪🇸" },
  { id: "LK", code: "+94", name: "Sri Lanka", flag: "🇱🇰" },
  { id: "SD", code: "+249", name: "Sudan", flag: "🇸🇩" },
  { id: "SR", code: "+597", name: "Suriname", flag: "🇸🇷" },
  { id: "SJ", code: "+47", name: "Svalbard", flag: "🇸🇯" },
  { id: "SZ", code: "+268", name: "Swaziland", flag: "🇸🇿" },
  { id: "SE", code: "+46", name: "Sweden", flag: "🇸🇪" },
  { id: "CH", code: "+41", name: "Switzerland", flag: "🇨🇭" },
  { id: "SY", code: "+963", name: "Syria", flag: "🇸🇾" },
  { id: "TW", code: "+886", name: "Taiwan", flag: "🇹🇼" },
  { id: "TJ", code: "+992", name: "Tajikistan", flag: "🇹🇯" },
  { id: "TZ", code: "+255", name: "Tanzania", flag: "🇹🇿" },
  { id: "TH", code: "+66", name: "Thailand", flag: "🇹🇭" },
  { id: "TG", code: "+228", name: "Togo", flag: "🇹🇬" },
  { id: "TK", code: "+690", name: "Tokelau", flag: "🇹🇰" },
  { id: "TO", code: "+676", name: "Tonga", flag: "🇹🇴" },
  { id: "TT", code: "+1", name: "Trinidad and Tobago", flag: "🇹🇹" },
  { id: "TN", code: "+216", name: "Tunisia", flag: "🇹🇳" },
  { id: "TR", code: "+90", name: "Turkey", flag: "🇹🇷" },
  { id: "TM", code: "+993", name: "Turkmenistan", flag: "🇹🇲" },
  { id: "TC", code: "+1", name: "Turks and Caicos Islands", flag: "🇹🇨" },
  { id: "TV", code: "+688", name: "Tuvalu", flag: "🇹🇻" },
  { id: "UG", code: "+256", name: "Uganda", flag: "🇺🇬" },
  { id: "UA", code: "+380", name: "Ukraine", flag: "🇺🇦" },
  { id: "AE", code: "+971", name: "United Arab Emirates", flag: "🇦🇪" },
  { id: "GB", code: "+44", name: "United Kingdom", flag: "🇬🇧" },
  { id: "US", code: "+1", name: "United States", flag: "🇺🇸" },
  { id: "UY", code: "+598", name: "Uruguay", flag: "🇺🇾" },
  { id: "UZ", code: "+998", name: "Uzbekistan", flag: "🇺🇿" },
  { id: "VU", code: "+678", name: "Vanuatu", flag: "🇻🇺" },
  { id: "VE", code: "+58", name: "Venezuela", flag: "🇻🇪" },
  { id: "VN", code: "+84", name: "Vietnam", flag: "🇻🇳" },
  { id: "WF", code: "+681", name: "Wallis and Futuna", flag: "🇼🇫" },
  { id: "EH", code: "+212", name: "Western Sahara", flag: "🇪🇭" },
  { id: "YE", code: "+967", name: "Yemen", flag: "🇾🇪" },
  { id: "ZM", code: "+260", name: "Zambia", flag: "🇿🇲" },
  { id: "ZW", code: "+263", name: "Zimbabwe", flag: "🇿🇼" }
];

export function ContactInformationSection({ 
  control, 
  watchedCountryId, 
  isCountryPopoverOpen, 
  setCountryPopoverOpen 
}: ContactInformationSectionProps) {
  const selectedCountry = countries.find(country => country.id === watchedCountryId);

  return (
    <div className="border-b pb-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
      
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
                        <span className="truncate flex items-center gap-1">
                          {selectedCountry?.flag}
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
                              <span className="mr-2">{country.flag}</span>
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
